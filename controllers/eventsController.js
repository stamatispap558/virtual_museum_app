const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Events = mongoose.model('events');
var formidable = require('formidable');
var fs = require('fs');

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
                        console.log('if')
                        fields.img = '../img_ev/' + files.filetoupload.name;
                        insertRecord(req, res,fields);
                    }else{
                        fields.img = '../img_ev/' + files.filetoupload.name;
                        updateRecord(req, res,fields); 
                    }
                    
            }
		});
        }else{
            if (fields._id == ''){
                console.log('if')
                insertRecord(req, res,fields);
            }else{
                updateRecord(req, res,fields); 
            }
        }
        console.log('fields:',fields)
 	});
    // console.log('body:',fields);
    // if (fields._id == ''){
    //     console.log('if')
    //     insertRecord(req, res, fields);
    // }else
    //     updateRecord(req, res, fields);
});


function insertRecord(req, res,fields) {
    var events = new Events();
    
    events.code = '412121232'; //ok
    events.Id_admin = '34191408'; //ok
    events.registration_date = '2021-04-19'; //ok
    events.title = fields.title; //ok
    events.text = fields.text; //ok
    events.start_day = fields.start_day; //ok
    events.expire_day= fields.expire_day; //ok
    events.last_change_day = fields.last_change_day; //ok
    events.img = fields.img; //ok 
    events.last_change_day = '2020-03-25'; //ok
    console.log('insert body: ', events)
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
}

function updateRecord(req, res,fields) {
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