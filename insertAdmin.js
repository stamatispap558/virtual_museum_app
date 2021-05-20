const mongoose = require('mongoose');
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const adminSchema = require('./model_admin');
    // Connect to the MongoDB cluster
mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log(" Mongoose is connected"));
adminSchema.insertMany([
  { name: "Konstantinos",
    last_name: "Palios",
    Email: "konpalios@gmail.com",
    phone:6943910197,
    password : "1234567800"

  },
  {
    name: "admin",
    last_name: "admin",
    Email: "admin",
    phone:6943977197,
    password : "12345admin" 
  }
], function(err) {

  });