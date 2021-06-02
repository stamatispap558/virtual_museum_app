const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  ticket_code:  {
    type:String ,
    required:true,
    unique:true
  }, 
Issuedate: {
  type:Date ,
  required:true,
  default : Date.now
  },
  visitday: {
    type:Date ,
    required:true,
    
  },
  value: {
    type:String,  
    required:true} ,
  discount:{
    type:String,  
    required:true} ,
  user_mail:{
    type:String,  
    required:true},
  user_first_name:{
    type:String,  
    required:true},
   user_last_name:{
    type:String,  
    required:true}
  
});

const ticket=mongoose.model("tickets",ticketSchema);
module.exports=ticket;