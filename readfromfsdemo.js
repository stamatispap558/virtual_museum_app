const fs = require('fs');
const path = require('path');
const ekthemata = [];
let objectEktemata = {
        object_name : "Ο Στοχαστής",
        img:'../img_ex/Α25894.jpg',
        made_of: 'Λίθος',
        origins: 'Καρδίτσα Θεσσαλίας',
        early_date : '3300 π.Χ.',
        late_date : '4500 π.Χ.',
        period:'Τελική Νεολιθική περίοδος',
        dimensions: '',
        object_type : "ειδώλιο",
        sub_collection : 'Νεολιθικές Αρχαιότητές',
        path: 'Exhibitions\A_Neolithika\Α2',
        ex_description:'\n Μοναδικό μνημειακό ειδώλιο της νεολιθικής εποχής. Ανήκει σε μια ομάδα γλυπτών που συνεχίζουν την ειδωλοπλαστική παράδοση της Μέσης Νεολιθικής και πιθανότατα σχετίζονται με τη λατρεία της γονιμότητας.'
}

const collA1 = "A_Proistorika/coll_cycladices_arxaiotites";

fs.readdir(('./' + collA1 ), (err, folders) =>{
    folders.forEach(subfold => {
        if(fs.lstatSync('./' + collA1 +'/' + subfold).isDirectory()){
        fs.readdir(('./' + collA1 +'/' + subfold),(er, files) =>{
            files.forEach(file => {
                if( path.extname(file) == '.txt'){
                    let fpath = ('./' + collA1 +'/' + subfold); 
                    readmyFile(file, fpath);
                }
            });
        });
    }      
    });
},'utf8');

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
        objectEktemata.object_name = word;

        let fimg = '../' + 'img_ex/' + path.parse(file).name + '.jpg';
        objectEktemata.img = fimg;

        n = data.search('made_of');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        objectEktemata.made_of = word;
        
        n = data.search('origins');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        objectEktemata.origins = word;

        n = data.search('dimensions');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        objectEktemata.dimensions = word;

        n = data.search('period');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        objectEktemata.period = word;
        
        n = data.search('early_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        objectEktemata.early_date = word;

        n = data.search('late_date');
        name = data.slice(n,data.indexOf(',',n));
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
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
        objectEktemata.sub_collection = word;

        let filepath = fpath;
        objectEktemata.path = filepath;

        n = data.search('ex_description');
        name = data.slice(n);
        word = name.slice(name.indexOf(':')+1);
        //word.split('\"').join('');
        //console.log(word);
        objectEktemata.ex_description = word;



        ekthemata.push(objectEktemata);
        console.log(ekthemata);

      });
   
}

