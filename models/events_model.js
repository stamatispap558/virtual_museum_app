const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventssSchema = new Schema({
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
    required:true,
    unique:true} ,
  text:{
    type:String,  
    required:true} ,
  start_day:{
    type:String,  
    required:true
  },
  expire_day:{
    type:String,  
    required:true,
    default: ''
  },
  last_change_day:{
    require:true,
    type:Date,  
    default: Date.now
  },
  img:{
    type:String,
    required:true
  }

});

const Events=mongoose.model("Events",EventssSchema);
module.exports=Events;