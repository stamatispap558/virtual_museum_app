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
            }else{
                fields.Id_LastAdmin = req.session.loggedUserId;
                fields.last_change_day = new Date().toString()
                updateRecord(req, res,fields); 
            }
        }
        console.log('fileds:',fields)
 	});
});


function insertRecord(req, res,fields) {
    var exhibits = new Exhibits();
    
    exhibits.object_name = fields.object_name; //ok
    exhibits.dimensions = fields.dimensions; //ok
    exhibits.ex_description = fields.ex_description; //ok
    exhibits.period = fields.period; //ok
    exhibits.img = fields.img; //ok
    exhibits.made_of = fields.made_of; //ok
    exhibits.sub_collection = fields.sub_collection; //ok
    exhibits.early_date = fields.early_date; //ok
    exhibits.late_date = fields.late_date; //ok 
    exhibits.origins = fields.origins; //ok 
    exhibits.object_type= fields.object_type; //ok
    exhibits.path = fields.path; //ok 
    exhibits.culture = fields.culture; //ok
    exhibits.coll = fields.coll; //ok
    exhibits.Id_LastAdmin = req.session.loggedUserId; //ok
    exhibits.Exhibit_Id = fields.Exhibit_Id; //ok
    console.log('insert body: ', exhibits)
    if(req.session.loggedUserId){
    exhibits.save((err, doc) => {
        console.log('mpika');
        if (!err){
            console.log('mpika1');
            res.redirect('exhibits/list');
        }
        else {
            console.log('mpika2',err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, fields);
                res.render("exhibits/addOrEdit", {
                    viewTitle: "Insert Exhibit",
                    exhibits: fields
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
    if(req.session.loggedUserId){
    Exhibits.findOneAndUpdate({ _id: fields._id }, fields, { new: true }, (err, doc) => {
        if (!err) { res.redirect('exhibits/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, fields);
                res.render("exhibits/addOrEdit", {
                    viewTitle: 'Update Exhibit',
                    exhibits: fields
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