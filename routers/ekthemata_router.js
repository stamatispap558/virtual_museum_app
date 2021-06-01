const eventSchema = require('../models/model_exhibitions');
const mongoose = require('mongoose');
const router = require('express').Router();
let events = [];

router.get('/subcollectionA1',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Κυκλαδικός πολιτισμός'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionA2',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Νεολιθικές Αρχαιότητές'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionB1',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Κλασσική Περίοδος'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionB2',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Ρωμαϊκή Περίοδος'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionC1',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Αρχαϊκή περίοδος'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionC2',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Γεωμετρική περίοδος'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionD1',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Αρχαϊκή Περίοδος Μικροτεχίας'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });
  router.get('/subcollectionD2',(req,res) => {
    console.log('i got it')
    const apromise = new Promise((resolve,reject) =>{
      eventSchema.find({ sub_collection : 'Ύστερη Κλασσική περίοδος'},function(err,docs){
          if(err){
              reject(err);
          }
          else{
              events = docs;
              resolve('ok');
          }
      })
    })
    apromise.then(handlerResolved =>{
      res.status(200).json(events);
    },
    handlerReject =>{
      console.log(handlerReject)
      res.status(500).send("pls refresh the page")
    } )
  });

  module.exports = router;