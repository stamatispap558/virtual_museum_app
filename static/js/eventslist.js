const EventsSchema = require('../../models/events_model');
const mongoose = require('mongoose');
const router = require('express').Router();
let Events = []; 

router.get('',(req,res) => {
  //console.log('i got it')
  const apromise = new Promise((resolve,reject) =>{
    EventsSchema.find({},null,{sort:{registration_date:-1}},function(err,docs){
        if(err){
            reject(err);
        }
        else{
            Events = docs;
            resolve('ok');
        }
    })
  })
  apromise.then(handlerResolved =>{
    res.status(200).json(Events);
  },
  handlerReject =>{
    console.log(handlerReject)
    res.status(500).send("pls refresh the page")
  } )
});

  
module.exports = router;