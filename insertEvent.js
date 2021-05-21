const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const eventShema = require('./models/events_model');
let eventTable = [];
fs.readdir(('./' + 'Ekdilosis' ), (err, folders) =>{
        folders.forEach(subfold => {
            fs.readdir(('./' + 'Ekdilosis' +'/' + subfold),(er, files) =>{
                files.forEach(file => {
                    if( path.extname(file) == '.txt'){
                        let fpath = ('./' + 'Ekdilosis' +'/' + subfold); 
                        readmyEvent(file, fpath);
                    }
                });
            });
        });
    },'utf8');

function readmyEvent( file, fpath){
    fs.readFile((fpath + '/'+ file),'utf8',(err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let objectEvent = {
            code: '',
            Id_admin: '',
            registration_date:'',
            title:'' ,
            text:'',
            start_day:'',
            expire_day:'',
            last_change_day:'',
            img:''
        }
        let n = data.search('code');
        let name = data.slice(n,data.indexOf(',',n));
        let word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.code = word;

        objectEvent.Id_admin = 'admin';

        n = data.search('title');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.title = word;

        n = data.search('start_day');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.start_day= word;

        n = data.search('expire_day');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.expire_day= word;

        n = data.search('registration_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.registration_date= word;

        objectEvent.last_change_day = Date.now();

        n = data.search('text');
        name = data.slice(n);
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvent.text= word;

        objectEvent.img = '../img_ev/' + path.parse(file).name + '.jpg';

        eventTable.push(objectEvent);
    });
}
//Connect to the MongoDB cluster
const apromise = new Promise((resolve,reject) =>{
mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
  if(err){
    reject(err);
  }
  else{
    console.log(" Mongoose is connected");

let date = new Date();
eventShema.insertMany(eventTable, function(err) {
  if(err != null){
    reject(err);
  }else{
    resolve('ok');
  }

  });
}
});
});
apromise.then(handleResolved =>{
  mongoose.disconnect();
} , handleRejected =>{
  console.log(handleRejected);
  mongoose.disconnect();
});