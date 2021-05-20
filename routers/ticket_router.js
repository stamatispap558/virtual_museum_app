const Ticket = require('../models/ticket_model');
const codeTicket = require('./generateTicketCode');
const router = require('express').Router()


router.post('/ticket_create', async (req, res) => {
  try {
    const { Issuedate,visitday, value,  discount, user_mail, user_first_name, user_last_name } = req.body
    console.log(req.body)
    // validation
    if (!Issuedate || !visitday || !value || !discount || !user_mail || !user_first_name || !user_last_name   )
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' })

const newTicket = new Ticket({
 codeTicket,Issuedate,visitday, value,  discount, user_mail, user_first_name, user_last_name
  })
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