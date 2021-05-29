const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
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

// const express = require("express");
// const app = express();
// app.route("/add").post(function(req, res) {
//     var object = {
//       Admin_Id: "FirstId",
//       name: "Konstantinos",
//       last_name: "Palios",
//       Email: "konpalios@gmail.com",
//       phone:6943910197
//     };

//     admin.create(object, function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     });
//   });
