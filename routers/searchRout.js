const mongoose = require('mongoose')
const path = require('path');
const { title } = require('process');
const exhibitShema = require('../models/model_exhibitions');
const router = require('express').Router();

let ekthemata = [];

router
.get('/initialized',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      exhibitShema.find({},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              ekthemata = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(ekthemata);
    },
    handlerReject =>{
     // console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  }) 
  .post('/result',(req,res) =>{
      console.log('i got it');
     let title = req.body;
     console.log(title)
})






module.exports = router;