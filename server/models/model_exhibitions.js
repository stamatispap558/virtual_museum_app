import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExhibitSchema = new Schema({
    Exhibit_Id:  {
        type:String ,
        required:true,
        unique:true
      }, 
    Id_LastAdmin: {
      type:Date ,
      required:true
    },
    last_change_day: {
      type:Date ,
      required:true
    },
    object_name: {
      type:String,  
      required:true} ,
    collection : {
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
      type:String,
      required:true
    },
    material:{
      type:String,  
      required:true},
    subcollection:{
      type:String,  
      required:true},
    early_date:{
      type:String,  
      required:true},
    last_date:{
      type:String,  
      required:true},
    origins:{
      type:String,  
      required:true},
    object_type:{
      type:String,  
      required:true}, 
    culture:{
      type:String,  
      required:true},
    dimension:{
      type:String,  
      required:true},
    path:{
        type:String
    }
});
  
  const exhibit=mongoose.model("exhibits",ExhibitSchema);
  module.exports=exhibit;