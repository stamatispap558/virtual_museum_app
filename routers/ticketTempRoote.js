const mongoose = require('mongoose')
const user = require('../models/user_model');
const router = require('express').Router();
const Ticket = require('../models/ticket_model');
const codeTicket = require('./generateTicketCode');

let reqTicketCode = "";

router
.get('', (req,res,next) =>{
    console.log('ok')
    reqTicketCode = req.query.ticketcode;
    next()
  })
.get("/showticket",(req,res) => {
    console.log('some ticket data')
  const apromise = new Promise((resolve,reject) =>{
    Ticket.find({ticket_code:reqTicketCode},function(err,docs){
        if(err){
            reject(err);
        }
        else{
          console.log(docs)
          resolve(docs);
            
        }
    })
  })
  apromise.then(handlerResolved =>{
    res.status(200).json(handlerResolved[0]);
  },
  handlerReject =>{
    console.log(handlerReject)
    res.status(500).send("pls refresh the page")
  } )
  })

module.exports = router;