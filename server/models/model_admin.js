const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type:String ,
    required:true
  },
  last_name: {
    type:String ,
    required:true,
    
  },
  Email: {
    type:String,  
    required:true,
    unique:true
  } ,
  phone:{
    type:Number,  
    required:true
  } ,
  password : {
    type:String,
    require:true,
    min:[8,"Must be more than 8 charachters"] 
  }
  
});

const admin = mongoose.model("admin",adminSchema);
module.exports=admin;
