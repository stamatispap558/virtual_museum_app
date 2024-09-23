require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const uri = process.env.MONGO_URI;
const EventsShema = require('./models/events_model');

let EventsTable = [];
fs.readdir(('./' + 'events' ), (err, folders) =>{
        folders.forEach(subfold => {
            fs.readdir(('./' + 'events' +'/' + subfold),(er, files) =>{
                files.forEach(file => {
                    if( path.extname(file) == '.txt'){
                        let fpath = ('./' + 'events' +'/' + subfold); 
                        readmyEvents(file, fpath);
                    }
                });
            });
        });
    },'utf8');

function readmyEvents( file, fpath){
    fs.readFile((fpath + '/'+ file),'utf8',(err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let objectEvents = {
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
        objectEvents.code = word;

        objectEvents.Id_admin = 'admin';

        n = data.search('title');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvents.title = word;

        n = data.search('start_day');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvents.start_day= word;

        n = data.search('expire_day');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvents.expire_day= word;

        n = data.search('registration_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvents.registration_date= word;

        objectEvents.last_change_day = Date.now();

        n = data.search('text');
        name = data.slice(n);
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        //console.log(word);
        objectEvents.text= word;

        objectEvents.img = '../img_ev/' + path.parse(file).name + '.jpg';

        EventsTable.push(objectEvents);
    });
}

//Connect to the MongoDB cluster
const apromise = new Promise((resolve,reject) =>{
mongoose.connect( uri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
  if(err){
    reject(err);
  }
  else{
    console.log(" Mongoose is connected");

let date = new Date();
EventsShema.insertMany(EventsTable, function(err) {
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