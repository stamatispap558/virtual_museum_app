const path = require("path");
const mongoose = require('mongoose')
const express = require("express");
const User = require('./models/model_admin')
const app = express();
const eventDisp = require('./routers/eventTopage')
const jwt = require('jsonwebtoken')
const ticket = require('./routers/ticket_router')
const eventjs = require('./static/js/eventslist')
const ekthemata = require('./routers/ekthemata_router')
const Port = process.env.PORT || 9999;
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const searchrout = require('./routers/searchRout')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
  if(err){
    reject(err);
  }
  else{
    console.log(" Mongoose is connected");}
  });


app.use(express.json())

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});
app.use('/ticket_create',ticket);
// app.get('/ticket_create', (req,res) =>{
//   console.log('i got it t')
// })

app.use('/ekthemata',ekthemata);

app.use('/search',searchrout);

app.use('/html/event.html',eventDisp);

app.use('/api/give_eventTable',eventjs);



//app.use(express.static(path.join(__dirname, 'static/img')));
//app.use(express.static(path.join(__dirname, 'static/js')));
//app.use(express.static(path.join(__dirname, 'static/img_col')));
//app.use(express.static(path.join(__dirname, 'static/img_ev')));
//app.use(express.static(path.join(__dirname, 'static/img_ex')));
app.use(express.static(path.join(__dirname, 'static')));

app.listen( Port, err=>{
  if(err){
    return console.log('ERROR',err);
  }else{
  console.log("server has started on ",Port);
  }
});

const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ Email:username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (password === user.password)  {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })

	
	
})

require('./models/db');
require('./models/db1');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const exhibitsController = require('./controllers/exhibitsController');
const eventsController = require('./controllers/eventsController');
const intermediateController = require('./controllers/intermediateController');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars)  }));
app.set('view engine', 'hbs');

app.use('/exhibits', exhibitsController);
app.use('/events', eventsController);
app.use('/intermediate', intermediateController);

// const 
//     _handlebars = require('handlebars'),
//     expressHandlebars = require('express-handlebars'),
//     {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// app.engine('handlebars', expressHandlebars({
//     handlebars: allowInsecurePrototypeAccess(_handlebars)
// }))


// var http = require('http');
// var formidable = require('formidable');
// var fs = require('fs');

// app.post('/fileupload',(req,res) =>{
// 	var form = new formidable.IncomingForm();
// 	form.parse(req, function (err, fields, files) {
// 		var oldpath = files.filetoupload.path;
// 		var newpath = 'C:/Users/Stamatios/Desktop/all/MuseumProject/static/img_ex/' + files.filetoupload.name;
// 		fs.rename(oldpath, newpath, function (err) {
// 			if (err) throw err;
// 				res.write('File uploaded and moved!');
// 				res.end();
// 		});
// 		if (req.files){
// 			console.log(req.files);
// 		}
//  	});
	
// })

// app.use(express.json());

// app.post("/upload_files", upload.array("files"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });

	
// }

// app.use('/js', express.static(__dirname + '/static/'));
 