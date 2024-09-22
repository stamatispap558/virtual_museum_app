const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Exhibits = mongoose.model('exhibits');
var formidable = require('formidable');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render("exhibits/addOrEdit", {
        viewTitle: "Insert Exhibit"
    });
});

router.post('/', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({ message: 'Error parsing form data' });
        }
        console.log(fields)

        if (files.filetoupload && files.filetoupload.name) {
            const oldPath = files.filetoupload.path;
            const newPath = `./static/img_ex/${files.filetoupload.name}`;

            fs.copyFile(oldPath, newPath, function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Error saving file' });
                }

                fields.img = `../img_ex/${files.filetoupload.name}`;
                fields.Id_LastAdmin = 8998//req.session.loggedUserId;
                fields.last_change_day = new Date().toString();

                if (fields._id) {
                    updateRecord(req, res, fields);
                } else {
                    insertRecord(req, res, fields);
                }
            });
        } else {
            fields.Id_LastAdmin = req.session.loggedUserId;
            fields.last_change_day = new Date().toString();

            if (fields._id) {
                updateRecord(req, res, fields);
            } else {
                insertRecord(req, res, fields);
            }
        }
    });
});

function insertRecord(req, res, fields) {
    if (!req.session.loggedUserId) {
        return res.status(403).json({ message: 'Forbidden: no admin is logged in' });
    }
    delete fields['_id']
    const exhibits = new Exhibits(fields);
    
    exhibits.Id_LastAdmin = req.session.loggedUserId;

    exhibits.save((err, doc) => {
        if (!err) {
            return res.status(201).json({ message: 'Exhibit created successfully', exhibit: doc });
        } else {
            console.error('Error during record insertion: ', err);
            if (err.name === 'ValidationError') {
                const validationErrors = handleValidationError(err, fields);
                return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
            }
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }
    });
}

function updateRecord(req, res, fields) {
    if (!req.session.loggedUserId) {
        return res.status(403).json({ message: 'Forbidden: no admin is logged in' });
    }

    Exhibits.findOneAndUpdate({ _id: fields._id }, fields, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({ message: 'Exhibit updated successfully', exhibit: doc });
        } else {
            console.error('Error during record update: ', err);
            if (err.name === 'ValidationError') {
                const validationErrors = handleValidationError(err, fields);
                return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
            }
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }
    });
}

// Get the list of exhibits
router.get('/list', (req, res) => {
    Exhibits.find((err, docs) => {
        if (!err) {
            res.json(docs); // Send the exhibit list as JSON
        } else {
            console.log('Error in retrieving exhibit list: ' + err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// router.get('/list', (req, res) => {
//     Exhibits.find((err, docs) => {
//         if (!err) {
//             res.render("exhibits/list", {
//                 list: docs
//             });
//         }
//         else {
//             console.log('Error in retrieving exhibit list :' + err);
//         }
//     });
// });



function handleValidationError(err, fields) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    
    const exhibitId = req.params.id;

    Exhibits.findById(exhibitId, (err, exhibit) => {
        if (err) {
            console.log('Error retrieving exhibit:', err);
            return res.status(500).send('Error retrieving exhibit');
        }

        if (!exhibit) {
            return res.status(404).send('Exhibit not found');
        }

        // Send exhibit data to the client
        res.json(exhibit); 
    });
});

router.get('/edit/:id', (req, res) => {
    const exhibitId = req.params.id;

    Exhibits.findById(exhibitId, (err, exhibit) => {
        if (err) {
            console.log('Error retrieving exhibit:', err);
            return res.status(500).send('Error retrieving exhibit');
        }

        if (!exhibit) {
            return res.status(404).send('Exhibit not found');
        }

        // Send exhibit data to the client
        res.json(exhibit); 
    });
});

router.delete('/delete/:id', (req, res) => {
    Exhibits.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list.html');
        }
        else { console.log('Error in exhibit delete :' + err); }
    });
});

module.exports = router;