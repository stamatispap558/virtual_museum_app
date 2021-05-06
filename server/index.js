const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
app.use(cors())
const dotenv=require("dotenv");
dotenv.config()
const Port = process.env.Port || 8080;
app.listen(Port, ()=>console.log("server has started!"));
app.get("/Stamatis",(req,res)=>{res.sendFile("./index.html");});
mongoose.connect(process.env.mongodb_access,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
error=>{
    if (error) return console.log("error")
    console.log("connected to mongodb!")
    
})

// Su6GhnY79Jpn3BvE StamPap97

// mongodb+srv://StamPap97:<password>@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('./MuseumProject'));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/MuseumProject/index.html'));
});


