const mongoose = require('mongoose')
const path = require('path');
const exhibitShema = require('../models/model_exhibitions');
const router = require('express').Router();

let ekthemata = [];

router
.get('/initialized',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      exhibitShema.find({},'object_name',function(err,docs){
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
  .get('/result',(req,res) =>{
    let name = req.query.object_name;
    const apromise = new Promise((resolve,reject) =>{
      exhibitShema.find({object_name:name},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              ekthemata = docs;
              resolve('ok');
          }
      })
    });
    apromise.then(handlerResolved =>{
      res.status(200).json(ekthemata);
    },
    handlerReject =>{
     // console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  

})






module.exports = router;