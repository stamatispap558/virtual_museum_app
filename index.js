const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
app.use(cors())
const dotenv=require("dotenv");
const { static, response } = require("express");
dotenv.config()
const Port = process.env.PORT || 8080;
app.listen(Port, ()=>console.log("server has started!"));
<<<<<<< HEAD
app.get("/Stamatis",(req,res)=>{res.render('index.ejs');});
mongoose.connect(process.env.mongodb_access,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
error=>{
    if (error) return console.log("error");
    console.log("connected to mongodb!");
=======
// app.get("/Stamatis",(req,res)=>{res.send("it works!");});
// mongoose.connect(process.env.mongodb_access,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// error=>{
//     if (error) return console.log("error");
//     console.log("connected to mongodb!");
>>>>>>> 085a60bf0f2bd152b38a45369fc58df713574f15
    
// })
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(__dirname + 'static/css'));
app.use('/img',express.static(__dirname + 'static/img'));
app.use('/js', express.static(__dirname + 'static/js'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/events.html',(request, response) => {
  response.sendFile(path.join(__dirname, 'static/html/events.html'))
});

app.use(express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(__dirname + 'static/css'));
app.use('/img',express.static(__dirname + 'static/img'));

// Su6GhnY79Jpn3BvE StamPap97

// mongodb+srv://StamPap97:<password>@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority



