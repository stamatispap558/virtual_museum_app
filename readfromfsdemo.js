const fs = require('fs');
const path = require('path');
const ekthemata = [];

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
            object_name : '',
            img:'',
            made_of: '',
            origins: '',
            early_date : '',
            late_date : '',
            last_update : '',
            last_admin_update : '',
            period:'',
            dimensions: '',
            object_type : '',
            sub_collection : '',
            path: '',
            ex_description: ''
    }

        let n = data.search('object_name');
        let name = data.slice(n,data.indexOf(',',n));
        let word = name.slice(name.indexOf(':')+1);
        // word.split('\"').join('');
        word = word.split('\"').join('');
        word = word.split('\'').join('');
        objectEktemata.object_name = word;

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
        objectEktemata.dimensions = word;

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
        objectEktemata.sub_collection = word;

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
        
        objectEktemata.last_admin_update = 'admin';
        
        let day  = new Date();
        taketime = day.getFullYear() + '-'+ (day.getMonth()+1) +'-'+ day.getDate() + '  ' + day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
        objectEktemata.last_update = taketime;



        ekthemata.push(objectEktemata);
        console.log(ekthemata);

      });
   
}

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("mydb");
    dbo.collection("exhibitions").insertMany(ekthemata, function(err, res){
      if (err) throw err;
      db.close();
    });
  }); 

