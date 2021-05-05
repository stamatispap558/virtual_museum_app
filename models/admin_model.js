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

const express = require("express");
const app = express();
app.route("/add").post(function(req, res) {
    var object = {
      Admin_Id: "FirstId",
      name: "Konstantinos",
      last_name: "Palios",
      Email: "konpalios@gmail.com",
      phone:6943910197
    };
  
    admin.create(object, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });