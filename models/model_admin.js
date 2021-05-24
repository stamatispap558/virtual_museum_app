const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  Admin_Id:  {
      type:String ,
      required:true,
      unique:true
    }, // String is shorthand for {type: String}
  username: {
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
  unique:true} ,
  phone:{
    type:Number,  
    required:true} ,
  password : {
      type:String,
      require:true,
      min:[8,"Must be more than 8 characters"] 
  }
  
});
//adminSchema.plugin(passportLocalMongoose);
const admin=mongoose.model("admins",adminSchema);
module.exports=admin;

