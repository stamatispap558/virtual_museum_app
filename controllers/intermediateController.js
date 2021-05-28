const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Exhibits = mongoose.model('exhibits');
var formidable = require('formidable');
var fs = require('fs');

router.get('/', (req, res) => {
    res.render("intermediate/intermediatepage", {
        viewTitle: "Τροποποίηση"
    });
});

module.exports = router;
