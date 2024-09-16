require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
mongoose.connect(uri || 'mongodb://localhost:27017/mydb/Events', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./events_model');
