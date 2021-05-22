const mongoose = require('mongoose')
const user = require('../models/user_model');
const router = require('express').Router();
const Ticket = require('../models/ticket_model');
const codeTicket = require('./generateTicketCode');


router.post('', async (req, res) => {
  
  try {
    //console.log('got it');
    const { ticket_code,Issuedate,visitday, value,  discount, user_mail, user_first_name, user_last_name } = req.body
    console.log(req.body)
    // validation
    if (!Issuedate || !visitday || !value || !discount || !user_mail || !user_first_name || !user_last_name   ){
      return res.status(400).json({ errorMessage: 'Please enter all required fields.' })
    }
    if( user_mail.indexOf('@') === -1){
      return res.status(400).json({ errorMessage: 'Please enter all required fields.' })
    }
      

const newTicket = new Ticket({ticket_code,Issuedate,visitday, value,  discount, user_mail, user_first_name, user_last_name})
let findresult = user.findOne({Email : user_mail },function(err,data){
  if(data == null){
    const newUser = new user({Email:user_mail, user_name: user_first_name,user_last : user_last_name})
    const saveduser = newUser.save()
}
});

const savedTicket = await newTicket.save()
return res.status(200).json({
    successMessage: 'Ticket was created successfully',

  })
} catch (err) {
  console.error(err)
  res.status(500).send()
}
})



module.exports=router;