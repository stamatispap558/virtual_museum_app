
const mongoose = require('mongoose');
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const userSchema = require('./models/user_model');

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
userSchema.insertMany([
{ 
Email: "zero@mail.com",
user_name:"zerouser",
user_last: "zerouser",
phone : 697777777
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

