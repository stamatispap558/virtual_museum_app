const express = require("express");
const app = express();
app.route("/add").post(function(req, res) {
    var object = {
      Admin_Id: "FirstId",
      name: "Konstantinos",
      last_name: "Palios",
      Email: "konpalios@gmail.com",
      phone:6943910197
    };
  
    admin.create(object, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });