import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name:  {
      type:String ,
      required:true
    }, // String is shorthand for {type: String}
  user_last: {
    type:String ,
    required:true
  },
  Email: {
    type:String ,
    required:true,
    unique:true
  },
  dateofregistration: {
    type:Date,  
    required:true} ,
  phone:{
    type:Number,  
    required:true} ,
  
});

const user=mongoose.model("users",userSchema)
module.exports=user