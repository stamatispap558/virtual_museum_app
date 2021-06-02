const fs = require('fs');
const path = require('path');
const ekthemata = [];
const exhibitSchema = require('./models/model_exhibitions')
const datafiles =[ "A_Proistorika/coll_cycladices_arxaiotites","A_Proistorika/συλλογη_νεολιθικων_αρχαιοτητων",
"B_ErgaGlyptikis/κλασσικη περιοδος","B_ErgaGlyptikis/ρωμαικη περιοδος","C_ErgaMetallotexnias/αρχαϊκή περίοδος",
"C_ErgaMetallotexnias/γεωμετρικη περιοδος","D_AgiakaiMikrotexnia/αρχαικη περιοδος","D_AgiakaiMikrotexnia/υστερη κλασσικη-πρωιμη ελληνιστικη περιοδος"];

for (const subcoll of datafiles){
fs.readdir(('./' + subcoll ), (err, folders) =>{
    folders.forEach(subfold => {
        if(fs.lstatSync('./' + subcoll +'/' + subfold).isDirectory()){
        fs.readdir(('./' + subcoll +'/' + subfold),(er, files) =>{
            files.forEach(file => {
                if( path.extname(file) == '.txt'){
                    let fpath = ('./' + subcoll +'/' + subfold); 
                    readmyFile(file, fpath);
                }
            });
        });
    }      
    });
},'utf8');
}

function readmyFile(file, fpath){
    fs.readFile((fpath + '/'+ file),'utf8',(err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let objectEktemata = {
            Exhibit_Id:  '', 
            Id_LastAdmin: '',
            last_change_day: '',
            object_name:'',
            coll : '',
            ex_description:'' ,
            img:'',
            period:'',
            made_of:'',
            sub_collection:'',
            early_date:'',
            late_date:'',
            origins:'',
            object_type:'', 
            culture:'',
            dimensions:'',
            path:''

    }

        let n = data.search('object_name');
        let name = data.slice(n,data.indexOf(',',n));
        let word = name.slice(name.indexOf(':')+1);
        // word.split('\"').join('');
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.object_name = word.slice(1);

        let fimg = '../' + 'img_ex/' + path.parse(file).name + '.jpg';
        objectEktemata.img = fimg;

        n = data.search('made_of');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.made_of = word;
        
        n = data.search('origins');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.origins = word;

        n = data.search('dimensions');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.dimension = word;

        n = data.search('period');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.period = word;
        
        n = data.search('early_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.early_date = word;

        n = data.search('late_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.late_date = word;

        n = data.search('object_type');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        objectEktemata.object_type = word;

        n = data.search('sub_collection');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.sub_collection = word.slice(1);

        let filepath = fpath;
        objectEktemata.path = filepath;

        n = data.search('ex_description');
        name = data.slice(n);
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.ex_description = word;
        
        
        objectEktemata.Id_LastAdmin = 'admin';
        
        let day  = new Date();
        taketime = day.getFullYear() + '-'+ (day.getMonth()+1) +'-'+ day.getDate() + '  ' + day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
        objectEktemata.last_change_day = taketime;

        let exid = path.parse(file).name; 
        objectEktemata.Exhibit_Id = exid;

        objectEktemata.coll = fpath.slice(2,fpath.indexOf("/",2));




        ekthemata.push(objectEktemata);
        // console.log(ekthemata);

      });
   
}

const mongoose = require('mongoose');
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const apromise = new Promise((resolve,reject) =>{
    mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
      if(err){
        reject(err);
      }
      else{
        console.log(" Mongoose is connected");
    
    let date = new Date();
    exhibitSchema.insertMany(ekthemata, function(err) {
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

