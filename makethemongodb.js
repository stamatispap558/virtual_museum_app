const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const collA = "A_Proistorika";
const collB = "B_ErgaGlyptikis";
const collC = "C_ErgaMetallotexnias";
const collD = "D_AgiakaiMikrotexnia";

const userzero = 
  {
  user_name : 'Γιώργος',
  user_last : 'Παππάς',
  Email : 'geopap@gmail.com',
  phone : '2323234444',
  };
const ticketzero =
{
ticket_code:'AAAAaaaa10' ,
Issuedate: '',
visitday: '',
value: '12',
discount: '0',
user_mail: 'geopap@gmail.com',
user_first: 'Γιώργος',
user_last: 'Παππάς'
 
}
const admins =
{
first_name: 'Konstantinos',
last_name: 'Palios',
Email: 'hcon@gmail.com',
pswd:'56789230',
phone : '2422442455'
};

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");
//   dbo.createCollection("user", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");

//     db.close();
//   });
// });
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");
//   dbo.createCollection("ticket", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");

//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");
//   dbo.collection("user").insertOne(userzero, function(err, res){
//     if (err) throw err;
//     db.close();
//   });
// }); 
// MongoClient.connect(url, function(err, db) {
//    if (err) throw err;
//    const dbo = db.db("mydb");
//    dbo.collection("ticket").insertOne(ticketzero, function(err, res){
//      if (err) throw err;
//      db.close();
//    });
//  });
// MongoClient.connect(url, function(err, db) {
//    if (err) throw err;
//    const dbo = db.db("mydb");
//    dbo.createCollection("admin", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");

//     db.close();
//    });
//  });
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");
//   dbo.createCollection("exhibitions", function(err, res) {
//    if (err) throw err;
//    console.log("Collection created!");

//    db.close();
//   });
// });
MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   const dbo = db.db("mydb");
   dbo.collection("admin").insertOne(admins, function(err, res){
     if (err) throw err;
     db.close();
   });
 }); 

