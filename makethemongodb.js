const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const collA = "A_Proistorika";
const collB = "B_ErgaGlyptikis";
const collC = "C_ErgaMetallotexnias";
const collD = "D_AgiakaiMikrotexnia";



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 

