// const events = [
//     {
//     code: "R45t45",
//     title: "Σχεδιάζοντας στο μουσείο 1" ,
//     img :"../img_ev/picture1.jpg", 
//     start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//     expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//     text : "text goes here 1"
//     },
//     {
//         code: "R46t46",
//         title: "Σχεδιάζοντας στο μουσείο 2" ,
//         img :"../img_ev/picture2.jpg", 
//         start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 2"
//         },
//     {
//         code: "R45t47",
//         title: "Σχεδιάζοντας στο μουσείο 3" ,
//         img :"../img_ev/picture1.jpg", 
//        start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 3" 
//     },
//     {
//         code: "R45t48",
//         title: "Σχεδιάζοντας στο μουσείο 4" ,
//         img :"../img_ev/picture2.jpg", 
//         start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 4"
//         },
//     {
//         code: "R45t49",
//         title: "Σχεδιάζοντας στο μουσείο 5" ,
//         img :"../img_ev/picture2.jpg", 
//         start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 5"
//         },
//     {
//         code: "R45t55",
//         title: "Σχεδιάζοντας στο μουσείο 6" ,            
//         img :"../img_ev/picture2.jpg", 
//         start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 6"
//     },
//     {
//         code: "R45t56",
//         title: "Σχεδιάζοντας στο μουσείο 7" ,
//         img :"../img_ev/picture3.jpg", 
//         start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         text : "text goes here 7"
//         }
//         //,
//         // {
//         //     code: "R46t46",
//         //     title: "Σχεδιάζοντας στο μουσείο 2" ,
//         //     img :"../img_ev/picture2.jpg", 
//         //     start_day: "04 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         //     expire_day:"28 ΦΕΒ 2019 ΔΕΥΤΕΡΑ",
//         //     text : "text goes here 2"
//         //     }
// ]
const eventSchema = require('../../models/events_model');
const mongoose = require('mongoose');
const router = require('express').Router();
let events = []; 

router.get('',(req,res) => {
  //console.log('i got it')
  const apromise = new Promise((resolve,reject) =>{
    eventSchema.find({},null,{sort:{registration_date:-1}},function(err,docs){
        if(err){
            reject(err);
        }
        else{
            events = docs;
            resolve('ok');
        }
    })
  })
  apromise.then(handlerResolved =>{
    res.status(200).json(events);
  },
  handlerReject =>{
    console.log(handlerReject)
    res.status(500).send("pls refresh the page")
  } )
});
// const apromise = new Promise((resolve,reject) =>{
//     eventSchema.find({},function(err,docs){
//         if(err){
//             reject(err);
//         }
//         else{
//             events = docs;
//             resolve('ok');
//         }
//     })
    
//     });
//     apromise.then(handleResolved =>{
//       console.log('successfully disconnected with data to be found')
//       mongoose.disconnect();
//     } , handleRejected =>{
//       console.log(handleRejected);
//       mongoose.disconnect();
//     });
  
module.exports = router;