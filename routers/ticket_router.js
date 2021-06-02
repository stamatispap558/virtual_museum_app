const mongoose = require('mongoose')
const user = require('../models/user_model');
const router = require('express').Router();
const Ticket = require('../models/ticket_model');
const codeTicket = require('./generateTicketCode');

let reqTicketCode = "";

router.post('/create', async (req, res) => {
  
  try {
    //console.log('got it');
    const ticket_code = require("./generateTicketCode");
    const Issuedate = new Date();
    const visitday = req.body.visitday; 
    let value ="";
    if(req.body.categor=="Child under 18"){
      value="10 euro";
    }
    else if (req.body.categor=="Adult"){
      value="15 euro";
    }
    else if (req.body.categor=="Disabled"){
      value="10 euro";
    }
    else if (req.body.categor=="Student"){
      value="8 euro";
    }  
    const discount = req.body.categor; 
    const user_mail = req.body.email; 
    const user_first_name = req.body.firstname;
    const user_last_name = req.body.lastname;
    console.log(Issuedate ,visitday ,value ,discount ,user_mail ,user_first_name ,user_last_name)
    // validation
    if (!Issuedate || !visitday || !value || !discount || !user_mail || !user_first_name || !user_last_name   ){
      return res.status(400).send('Something Went Wrong - Try again1')
    }
    if( user_mail.indexOf('@') === -1){
      return res.status(400).send('Something Went Wrong - Try again2')
    }
      

const newTicket = new Ticket({ticket_code,Issuedate,visitday, value,  discount, user_mail, user_first_name, user_last_name})
let findresult = user.findOne({Email : user_mail },function(err,data){
  if(data == null){
    const newUser = new user({Email:user_mail, user_name: user_first_name,user_last : user_last_name})
    const saveduser = newUser.save()
}
});

const savedTicket = await newTicket.save( 
  function(err){
    if(err){
      res.status(500).send('Something Went Wrong - Try again3');
    }else{
      res.redirect("/ticket/view?ticketcode="+ticket_code);
    }
})
} catch (err) {
  console.error(err)
  res.status(500).send('Something Went Wrong - Try again');
}
})
.get("/view", (req,res) =>{
  console.log('ok')
  reqTicketCode = req.query.ticketcode;
  res.redirect("/html/ticket_template.html")
})
.get("/showticket",(req,res) => {
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



module.exports=router;