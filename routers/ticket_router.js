const mongoose = require('mongoose')
const user = require('../models/user_model');
const router = require('express').Router();
const Ticket = require('../models/ticket_model');
const codeTicket = require('./generateTicketCode');
const genCode = require("./generateTicketCode");
let reqTicketCode = "";

router.post('/create', async (req, res) => {
  
  try {
    //console.log('got it');
    const ticket_code = genCode();
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
      res.send(err);
    }else{
      res.redirect('/html/ticket_template.html?ticketcode='+ticket_code);
    }
})
} catch (err) {
  console.error(err)
  res.status(500).send('Something Went Wrong - Try again');
}
})




module.exports=router;