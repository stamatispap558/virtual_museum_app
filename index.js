const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
app.use(cors())
const dotenv=require("dotenv");
dotenv.config()
const Port = process.env.PORT || 8080;
app.listen(Port, ()=>console.log("server has started!"));
app.get("/Stamatis",(req,res)=>{res.send("it works!");});
mongoose.connect(process.env.mongodb_access,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
error=>{
    if (error) return console.log("error");
    console.log("connected to mongodb!");
    
})

app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, 'static/html/homepage.html'));
  response.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(__dirname + 'static/css'));
app.use('/img',express.static(__dirname + 'static/img'));

// Su6GhnY79Jpn3BvE StamPap97

// mongodb+srv://StamPap97:<password>@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority



