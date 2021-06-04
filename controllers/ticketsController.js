const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Tickets = mongoose.model('tickets');
var formidable = require('formidable');
var fs = require('fs');


router.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
        console.log(files.filetoupload.name)
        if(files.filetoupload.name != ''){
            let oldpath = files.filetoupload.path;
		    let newpath = './static/img_ex/'+ files.filetoupload.name;
		    fs.rename(oldpath, newpath, function (err) {
			    if (err){
                    throw err
                }else{
                    if (fields._id == ''){
                        console.log('if')
                        fields.img = '../img_ex/' + files.filetoupload.name;
                        fields.Id_LastAdmin = req.session.loggedUserId;
                        fields.last_change_day = new Date().toString()
                        insertRecord(req, res,fields);
                    }else{
                        fields.img = '../img_ex/' + files.filetoupload.name;
                        fields.Id_LastAdmin = req.session.loggedUserId;
                        fields.last_change_day = new Date().toString()
                        updateRecord(req, res,fields); 
                    }
                    
            }
		});
        }else{
            if (fields._id == ''){
                console.log('if')
                insertRecord(req, res,fields);
            }
        }
        console.log('fileds:',fields);
 	});
});


function insertRecord(req, res,fields) {
    var tickets = new Tickets();
    
    tickets.ticket_code = fields.ticket_code; //ok
    tickets.Issuedate = fields.Issuedate; //ok
    tickets.visitday = fields.visitday; //ok
    tickets.value = fields.value; //ok
    tickets.discount = fields.discount; //ok
    tickets.user_mail = fields.user_mail; //ok
    tickets.user_first_name = fields.user_first_name; //ok
    tickets.user_last_name = fields.user_last_name; //ok
    
    console.log('insert body: ', tickets);
    if(req.session.loggedUserId){
    tickets.save((err, doc) => {
        console.log('mpika');
        if (!err){
            console.log('mpika1');
            res.redirect('tickets/list');
        }
        else {
            console.log('mpika2',err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, fields);
                res.render("ticket/create", {
                    viewTitle: "Insert Exhibit",
                    tickets: fields
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

router.get('/list', (req, res) => {
    Tickets.find((err, docs) => {
        if (!err) {
            res.render("tickets/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving ticket list :' + err);
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

module.exports = router;