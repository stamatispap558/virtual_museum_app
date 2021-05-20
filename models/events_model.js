import mongoose from 'mongoose';
const { Schema } = mongoose;

const eventsSchema = new Schema({
  code:  {
      type:String ,
      required:true,
      unique:true
    }, // String is shorthand for {type: String}
  Id_admin: {
    type:String ,
    required:true
  },
  registration_date: {
    type:Date ,
    required:true,
    
  },
  title: {
    type:String,  
    required:true} ,
  text:{
    type:String,  
    required:true} ,
  start_day:{
    type:Date,  
    required:true
  },
  expire_day:{
    type:Date,  
    required:true
  },
  last_change_day:{
    type:Date,  
    required:true
  },

});

const events=mongoose.model("events",eventsSchema);
module.exports=events;