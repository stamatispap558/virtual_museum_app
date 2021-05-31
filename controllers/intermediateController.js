const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Exhibits = mongoose.model('exhibits');
var formidable = require('formidable');
var fs = require('fs');

router.get('/', (req, res) => {
    if (req.session.loggedUserId) {
        res.render("intermediate/intermediatepage", {
            viewTitle: "Τροποποίηση", admin: req.session.loggedUserId
        });
    }
    else {
        //console.log(path.join(__dirname, 'static/html/login_prot.html'))
        res.redirect('/html/login_prot.html')
    }
});

module.exports = router;
