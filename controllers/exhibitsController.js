const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Exhibits = mongoose.model('exhibits');

router.get('/', (req, res) => {
    res.render("exhibits/addOrEdit", {
        viewTitle: "Insert Exhibit"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var exhibits = new Exhibits();
    exhibits.object_name = req.body.object_name;
    exhibits.dimensions = req.body.dimensions;
    exhibits.ex_description = req.body.ex_description;
    exhibits.period = req.body.period;
    exhibits.img = req.body.img;
    exhibits.made_of = req.body.made_of;
    exhibits.sub_collection = req.body.sub_collection;
    exhibits.early_date = req.body.early_date;
    exhibits.late_date = req.body.late_date;
    exhibits.origins = req.body.origins;
    exhibits.object_type= req.body.object_type;
    exhibits.path = req.body.path;
    exhibits.save((err, doc) => {
        if (!err)
            res.redirect('exhibits/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("exhibits/addOrEdit", {
                    viewTitle: "Insert Exhibit",
                    exhibits: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Exhibits.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('exhibits/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("exhibits/addOrEdit", {
                    viewTitle: 'Update Exhibit',
                    exhibits: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Exhibits.find((err, docs) => {
        if (!err) {
            res.render("exhibits/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving exhibit list :' + err);
        }
    });
});


function handleValidationError(err, body) {
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
    Exhibits.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("exhibits/addOrEdit", {
                viewTitle: "Update Exhibit",
                exhibits: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Exhibits.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/exhibits/list');
        }
        else { console.log('Error in exhibit delete :' + err); }
    });
});

module.exports = router;