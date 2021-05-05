const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
app.use(cors())
const dotenv=require("dotenv");
dotenv.config()
const Port = process.env.Port || 8080;
app.listen(Port, ()=>console.log("server has started!"));
app.get("/Stamatis",(req,res)=>{res.send("it works!");});
mongoose.connect(process.env.mongodb_access,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
error=>{
    if (error) return console.log("error")
    console.log("connected to mongodb!")
<<<<<<< HEAD
    
=======
>>>>>>> bf2082ef140a3498593edfae65fa266eaa1570a1
})

// Su6GhnY79Jpn3BvE StamPap97

// mongodb+srv://StamPap97:<password>@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

<<<<<<< HEAD


=======
>>>>>>> bf2082ef140a3498593edfae65fa266eaa1570a1
