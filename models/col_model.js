const mongoose = require('mongoose');

const colSchema = new mongoose.Schema({
  coll_code:  {
    type:String ,
    required:true,
    unique:true
  }, // String is shorthand for {type: String}
  coll_name: {
    type:String ,
    required:true
  },
  coll_description: {
    type:String ,
    required:true,
  },
  col_img: {
    type:String,  
    required:true} ,
});

const collection=mongoose.model("collections",colSchema);
module.exports=collection;