import mongoose from 'mongoose';
const { Schema } = mongoose;

const ticketSchema = new Schema({
  ticket_code:  {
      type:String ,
      required:true,
      unique:true
    }, // String is shorthand for {type: String}
  Issuedate: {
    type:Date ,
    required:true
  },
  visitday: {
    type:Date ,
    required:true,
    
  },
  value: {
    type:Date,  
    required:true} ,
  discount:{
    type:String,  
    required:true} ,
  user_mail:{
    type:String,  
    required:true},
  user_first_mail:{
    type:String,  
    required:true},
   user_last_mail:{
    type:String,  
    required:true}
  
});

const ticket=mongoose.model("tickets",ticketSchema);
module.exports=ticket;