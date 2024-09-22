require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin_model'); // Assuming you are exporting the model from 'admin_model.js'

const uri = process.env.MONGO_URI;

// Connect to the MongoDB cluster
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Mongoose is connected");

  // Insert data using the Admin model
  Admin.insertMany([
    {
      username: "Konstantinos",
      last_name: "Palios",
      Email: "konpalios@gmail.com",
      phone: 6943910197,
      password: "1234567800"
    },
    {
      username: "admin",
      last_name: "admin",
      Email: "admin",
      phone: 6943977197,
      password: "12345admin"
    }
  ], function(err, docs) {
    if (err) {
      console.error('Error inserting documents:', err);
    } else {
      console.log('Documents inserted:', docs);
    }

    // Close the connection after insertion
    mongoose.connection.close();
  });
});
