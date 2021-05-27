const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Exhibits = mongoose.model('exhibits');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    res.render("exhibits/addOrEdit", {
        viewTitle: "Insert Exhibit"
    });
});

router.post('/', (req, res) => {
<<<<<<< HEAD
    router.post('/', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = 'C:/Users/Stamatios/Desktop/all/MuseumProject/static/img_ex/' + files.filetoupload.name;
            // var newpath = '../' + 'img_ex/' + path.parse(oldpath).name + '.jpg';
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                // 	res.write('File uploaded and moved!');
                // 	res.end();
            });
            // if (req.files){
            // 	console.log(req.files);
            // }
        });
    });
    console.log('body:',req.body);
    if (req.body._id == ''){
        console.log('if')
        insertRecord(req,oldpath, res);
    }
        else
        updateRecord(req, res);
});


function insertRecord(req,path, res) {
    var exhibits = new Exhibits();
    
    exhibits.object_name = req.body.object_name; //ok
    exhibits.dimensions = req.body.dimensions; //ok
    exhibits.ex_description = req.body.ex_description; //ok
    exhibits.period = req.body.period; //ok
    exhibits.img = '../' + 'img_ex/' + path.parse(path).name + '.jpg'; //ok
    exhibits.made_of = req.body.made_of; //ok
    exhibits.sub_collection = req.body.sub_collection; //ok
    exhibits.early_date = req.body.early_date; //ok
    exhibits.late_date = req.body.late_date; //ok 
    exhibits.origins = req.body.origins; //ok 
    exhibits.object_type= req.body.object_type; //ok
    exhibits.path = req.body.path; //ok 
    exhibits.culture = req.body.culture; //ok
    exhibits.coll = req.body.coll; //ok
    // exhibits.material = req.body.material;
    // exhibits.last_change_day = '2020-03-25'; //ok
    exhibits.Id_LastAdmin = '274952457'; //ok
    exhibits.Exhibit_Id = '314134144'; //ok
=======
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
                        insertRecord(req, res,fields);
                    }else{
                        fields.img = '../img_ex/' + files.filetoupload.name;
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
        console.log('fileds:',fields)
 	});
    // console.log('body:',fields);
    // if (fields._id == ''){
    //     console.log('if')
    //     insertRecord(req, res, fields);
    // }else
    //     updateRecord(req, res, fields);
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
    // exhibits.material = req.body.material;
    // exhibits.last_change_day = '2020-03-25'; //ok
    exhibits.Id_LastAdmin = 'admin'; //ok
    exhibits.Exhibit_Id = '314134143'; //ok
>>>>>>> 430e82d9d50de19b4dae6968aa73acd6d8f91b66
    console.log('insert body: ', exhibits)
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
}

function updateRecord(req, res,fields) {
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