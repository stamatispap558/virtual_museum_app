import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
  Admin_Id:  {
      type:String ,
      required:true,
      unique:true
    }, // String is shorthand for {type: String}
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
    required:true} ,
  phone:{
    type:Number,  
    required:true} ,
  
});

const admin=mongoose.model("admin",adminSchema);
module.exports=admin;
