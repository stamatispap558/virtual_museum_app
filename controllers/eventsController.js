const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Events = mongoose.model('Events');
const Events=require("../models/events_model")
const formidable = require('formidable');
const fs = require('fs');
const randomString = require('../routers/generateTicketCode');



router.get('/', (req, res) => {
    res.render("Events/addOrEdit2", {
        viewTitle: "Insert Events"
    });
});

router.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
        console.log(files.filetoupload.name)
        if(files.filetoupload.name != ''){
            let oldpath = files.filetoupload.path;
            console.log(oldpath)
		    let newpath = './static/img_ev/'+ files.filetoupload.name;
            console.log(newpath)
		    fs.copyFile(oldpath, newpath, function (err) {
			    if (err){
                    throw err
                }else{
                    if (fields._id == ''){
                        console.log(req.session.loggedUserId)
                        fields.img = '../img_ev/' + files.filetoupload.name;
                        
                        insertRecord(req, res,fields);
                    }else{
                        fields.img = '../img_ev/' + files.filetoupload.name;
                        fields.Id_admin = req.session.loggedUserId;
                        fields.last_change_day = new Date().toString()
                        updateRecord(req, res,fields); 
                    }
                    
            }
		});
        }else{
            if (fields._id == ''){
                console.log(req.session.loggedUserId)

                insertRecord(req, res,fields);
            }else{
                fields.Id_admin = req.session.loggedUserId;
                fields.last_change_day = new Date().toString()
                updateRecord(req, res,fields); 
            }
        }
        console.log('fields:',fields)
 	});
    
});


function insertRecord(req, res, fields) {
    if (!req.session.loggedUserId) {
        console.log('Error: no admin is logged in');
        return res.status(403).json({ message: 'Forbidden: no admin is logged in' });
    }

    const eventData = {
        code: 'E' + randomString().slice(5),
        Id_admin: req.session.loggedUserId,
        registration_date: new Date().toString(),
        title: fields.title,
        text: fields.text,
        start_day: fields.start_day,
        expire_day: fields.expire_day,
        img: fields.img,
    };

    // Create a new instance of the Events model
    const event = new Events(eventData);

    console.log('insert body: ', event);

    event.save((err, doc) => {
        if (!err) {
            console.log('Event saved successfully');
            return res.status(201).json({ message: 'Event created successfully', event: doc });
        } else {
            console.log('Error during record insertion: ', err);
            if (err.name === 'ValidationError') {
                const validationErrors = handleValidationError(err, fields);
                return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
            } else {
                return res.status(500).json({ message: 'Internal Server Error', error: err });
            }
        }
    });
}


function updateRecord(req, res, fields) {
    // if (fields.Id_admin != null) {
    if(1){
        Events.findOneAndUpdate({ _id: fields._id }, fields, { new: true }, (err, doc) => {
            if (!err) {
                return res.status(200).json({ message: 'Event updated successfully', event: doc });
            } else {
                console.log('Error during record update: ', err);
                if (err.name === 'ValidationError') {
                    const validationErrors = handleValidationError(err, fields);
                    return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
                } else {
                    return res.status(500).json({ message: 'Internal Server Error', error: err });
                }
            }
        });
    } else {
        console.log('Error: no admin is logged in');
        return res.status(403).json({ message: 'Forbidden: no admin is logged in' });
    }
}



router.get('/list', (req, res) => {
    Events.find((err, docs) => {
        if (!err) {
            res.json(docs); // Respond with JSON data
        } else {
            console.log('Error in retrieving event list: ' + err);
            res.status(500).json({ error: 'An error occurred while fetching the events.' });
        }
    });
});



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
    Events.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc); // Send the event document as JSON
        } else {
            console.log('Error retrieving event:', err);
            res.status(500).json({ error: 'Error retrieving event' }); // Send error response
        }
    });
});


router.delete('/delete/:id', (req, res) => {
    Events.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            // Optionally, you can send a success message as JSON
            return res.status(200).json({ message: 'Event deleted successfully!' });
        } else {
            console.log('Error in Events delete:', err);
            return res.status(500).json({ error: 'Error deleting event' });
        }
    });
});

module.exports = router;