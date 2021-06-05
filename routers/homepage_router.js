const collSchema = require('../models/col_model');
const mongoose = require('mongoose');
const router = require('express').Router();
const eventSchema = require('../models/events_model');
let coll = [];
const  ExhibitSchema = require('../models/model_exhibitions');


let tampleOfEx = [];
router.get('/collTample',(req,res) => {
    //console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      collSchema.find({},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              coll = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(coll);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send('an error occured pls refresh the page')
    } )
  })
  .get('/eventimg',(req,res) =>{
    const apromise = new Promise((resolve,reject) =>{
        eventSchema.findOne({},null,{sort:{registration_date:-1}},function(err,docs){
            if(err){
                reject(err);
            }
            else{
                resolve(docs);
            }
        })
      })
      apromise.then(handlerResolved =>{
        res.status(200).json(handlerResolved);
      },
      handlerReject =>{
        console.log(handlerReject)
        res.status(500).send('an error occured pls refresh the page')
      } )
    })
    .get('/ekthemata_load',(req,res) => {
      //console.log('i got it')
      const apromise = new Promise((resolve,reject) =>{
        ExhibitSchema.countDocuments().exec(function (err, count) {
          let random;
          if(err){
            reject(err)
          }else{
              random = Math.floor(Math.random() * (count-4))
              ExhibitSchema.find({},'object_name img').skip(random).limit(4).exec(
              function (err, result) {
                //console.log(result)
                tampleOfEx = result;
                resolve(tampleOfEx)
              }
          )
         
          }
          
           
      })
    })
      apromise.then(handlerResolved =>{
        //console.log(tampleOfEx);
        res.status(200).json(handlerResolved);
      },
      handlerReject =>{
        console.log(handlerReject)
        res.status(500).send('an error occured pls refresh the page')
      } )
    })




module.exports = router;