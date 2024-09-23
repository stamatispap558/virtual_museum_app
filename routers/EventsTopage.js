const mongoose = require('mongoose')
const path = require('path');
const EventsSchema = require('../models/events_model');
const user = require('../models/user_model');
const router = require('express').Router();

let EventsTitle = ' ';


router
.get('',(req,res,next) =>{
	//console.log(req.query.title)
    EventsTitle = req.query.title
	//res.status(200).sendFile('/static/html/events.html');
    next();
})
.get('/data',(req,res)=>{
    //console.log(EventsTitle);
    const apromise = new Promise((resolve,reject) =>{
        EventsSchema.find({title:EventsTitle},function(err,docs){
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
