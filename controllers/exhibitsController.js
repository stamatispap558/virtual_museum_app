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

    console.log('body:',req.body);
    if (req.body._id == ''){
        console.log('if')
        insertRecord(req, res);
    }
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
    exhibits.subcollection = req.body.subcollection;
    exhibits.early_date = req.body.early_date;
    exhibits.last_date = req.body.last_date;
    exhibits.origins = req.body.origins;
    exhibits.object_type= req.body.object_type;
    exhibits.path = req.body.path;
    exhibits.culture = req.body.culture;
    exhibits.material = req.body.material;
    exhibits.last_change_day = '2020-03-25';
    exhibits.Id_LastAdmin = '274952456';
    exhibits.Exhibit_Id = '314134143';
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