const mongoose = require('mongoose')
const path = require('path');
const eventSchema = require('../models/events_model');
const user = require('../models/user_model');
const router = require('express').Router();

let eventTitle = ' ';


router
.get('',(req,res,next) =>{
	//console.log(req.query.title)
    eventTitle = req.query.title
	//res.status(200).sendFile('/static/html/event.html');
    next();
})
.get('/data',(req,res)=>{
    //console.log(eventTitle);
    const apromise = new Promise((resolve,reject) =>{
        eventSchema.find({title:eventTitle},function(err,docs){
            if(err){
                reject(err);
            }
            else{
                //console.log(docs);
                resolve(docs);
            }
        })
      })
      apromise.then(handlerResolved =>{
        res.status(200).json(handlerResolved);
      },
      handlerReject =>{
        //console.log(handlerReject)
        res.status(500).send("pls refresh the page")
      } )
})





module.exports = router;
