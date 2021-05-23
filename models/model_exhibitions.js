const mongoose = require('mongoose');

const ExhibitSchema = new mongoose.Schema({
    Exhibit_Id:  {
        type:String ,
        required:true,
        unique:true
      }, 
    Id_LastAdmin: {
      type:String ,
      required:true
    },
    last_change_day: {
      type:Date ,
      required:true,
      default : Date.now
    },
    object_name: {
      type:String,  
      required:true} ,
    coll : {
        type:String,
        required:true
    },
    ex_description:{
      type:String,  
      required:true} ,
    img:{
      type:String,  
      required:true},
    period:{
      type:String
    },
    made_of:{
      type:String,  
      required:true},
    sub_collection:{
      type:String,  
      required:true},
    early_date:{
      type:String,  
      required:true},
    late_date:{
      type:String,  
      required:true},
    origins:{
      type:String
    },
    object_type:{
      type:String,  
      required:true}, 
    culture:{
      type:String
    },
    dimensions:{
      type:String},
    path:{
        type:String
    }
});
  
  const exhibit=mongoose.model("exhibits",ExhibitSchema);
  module.exports=exhibit;