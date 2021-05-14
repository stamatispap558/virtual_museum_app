const mongoose = require('mongoose');
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const ticketSchema = require('./models/ticket_model');

let numberString = Date.now();
numberString = numberString.toString();
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
numberString = numberString.slice(0,10);
let achar = characters.charAt(Math.floor(Math.random() * characters.length));
let ticketCode = numberString + achar;

    // Connect to the MongoDB cluster
const apromise = new Promise((resolve,reject) =>{
  mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(err){
      reject(err);
    }
    else{
      console.log(" Mongoose is connected");
    }
  });

  let date = new Date();
  ticketSchema.insertMany([
    { 
      ticket_code: ticketCode, 
      visitday: date,
      value: 15,
      discount:0,
      user_mail: "zero@mail.com",
      user_first_name:"zerouser",
      user_last_name: "zerouser"
      }
  ], function(err) {
    if(err != null){
      reject(err);
    }else{
      resolve('ok');
    }
  
    });
  });
  apromise.then(handleResolved =>{
    mongoose.disconnect();
  } , handleRejected =>{
    console.log(handleRejected);
    mongoose.disconnect();
  });

// mongoose.disconnect()
