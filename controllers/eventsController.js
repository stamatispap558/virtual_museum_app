const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Events = mongoose.model('events');
const formidable = require('formidable');
const fs = require('fs');
const randomString = require('../routers/generateTicketCode');



router.get('/', (req, res) => {
    res.render("events/addOrEdit2", {
        viewTitle: "Insert Event"
    });
});

router.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
        console.log(files.filetoupload.name)
        if(files.filetoupload.name != ''){
            let oldpath = files.filetoupload.path;
		    let newpath = './static/img_ev/'+ files.filetoupload.name;
		    fs.rename(oldpath, newpath, function (err) {
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


function insertRecord(req, res,fields) {
    var events = new Events();
    

    events.code = 'E' + randomString().slice(5); //ok
    events.Id_admin = req.session.loggedUserId; //ok
    events.registration_date = new Date().toString() //ok
    events.title = fields.title; //ok
    events.text = fields.text; //ok
    events.start_day = fields.start_day; //ok
    events.expire_day= fields.expire_day; //ok
    events.img = fields.img; //ok 
    
    console.log('insert body: ', events)
    if(req.session.loggedUserId){
    events.save((err, doc) => {
        console.log('mpika');
        if (!err){
            console.log('mpika1');
            res.redirect('events/list2');
        }
        else {
            console.log('mpika2',err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, fields);
                res.render("events/addOrEdit2", {
                    viewTitle: "Insert Event",
                    events: fields
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
    }else{
        console.log('Error no admin is logged in')
        res.redirect('/intermediate')
    }

}

function updateRecord(req, res,fields) {
    if(fields.Id_admin != null){
        Events.findOneAndUpdate({ _id: fields._id }, fields, { new: true }, (err, doc) => {
            if (!err) { res.redirect('events/list2'); }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, fields);
                    res.render("events/addOrEdit", {
                        viewTitle: 'Update Event',
                        events: fields
                    });
                }
                else
                    console.log('Error during record update : ' + err);
            }
        });
    }else{
        console.log('Error no admin is logged in')
        res.redirect('/intermediate')
    }
    
}


router.get('/list2', (req, res) => {
    Events.find((err, docs) => {
        if (!err) {
            res.render("events/list2", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving exhibit list2 :' + err);
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
            res.render("events/addOrEdit2", {
                viewTitle: "Update Event",
                events: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Events.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/events/list2');
        }
        else { console.log('Error in event delete :' + err); }
    });
});

module.exports = router;