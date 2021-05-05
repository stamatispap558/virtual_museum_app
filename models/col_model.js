import mongoose from 'mongoose';
const { Schema } = mongoose;

const colSchema = new Schema({
  col_id:  {
    type:String ,
    required:true,
    unique:true
  }, // String is shorthand for {type: String}
  col_name: {
    type:String ,
    required:true
  },
  col_description: {
    type:String ,
    required:true,
  },
  col_img: {
    type:String,  
    required:true} ,
});

const collection=mongoose.model("collections",colSchema);
module.exports=collection;