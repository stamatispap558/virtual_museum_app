const mongoose = require('mongoose')
const path = require('path');
const admin = require('../models/model_admin');
const router = require('express').Router();

router
.post('/login', async (req, res) => {
    console.log('i get admin')
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    const adminFind = await admin.findOne({ Email:username }).lean()
   if (!adminFind) {
       res.status(401).send('Invalid username');
    }
   if (password === adminFind.password)  {
       console.log('admin found')
        // the username, password combination is successful
       req.session.loggedUserId = username; 
       res.redirect("/intermediate")
    }
   else{
       res.status(401).send('Invalid password');
    }
})
.get('/logout',(req,res) =>{
    req.session.destroy();
    res.redirect('/');

})    


module.exports = router;