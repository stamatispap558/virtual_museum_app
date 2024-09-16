const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Events = mongoose.model('Events');
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
    var Events = new Events();
    

    Events.code = 'E' + randomString().slice(5); //ok
    Events.Id_admin = req.session.loggedUserId; //ok
    Events.registration_date = new Date().toString() //ok
    Events.title = fields.title; //ok
    Events.text = fields.text; //ok
    Events.start_day = fields.start_day; //ok
    Events.expire_day= fields.expire_day; //ok
    Events.img = fields.img; //ok 
    
    console.log('insert body: ', Events)
    if(req.session.loggedUserId){
    Events.save((err, doc) => {
        console.log('mpika');
        if (!err){
            console.log('mpika1');
            res.redirect('Events/list2');
        }
        else {
            console.log('mpika2',err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, fields);
                res.render("Events/addOrEdit2", {
                    viewTitle: "Insert Events",
                    Events: fields
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
            if (!err) { res.redirect('Events/list2'); }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, fields);
                    res.render("Events/addOrEdit", {
                        viewTitle: 'Update Events',
                        Events: fields
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
            res.render("Events/list2", {
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
            res.render("Events/addOrEdit2", {
                viewTitle: "Update Events",
                Events: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Events.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Events/list2');
        }
        else { console.log('Error in Events delete :' + err); }
    });
});

module.exports = router;