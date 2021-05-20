const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/model_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
},
error=>{
    if (error) return console.log("error")
    console.log("connected to mongodb!")
    
});

const app = express()
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

const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const exhibitsController = require('./controllers/exhibitsController');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars)  }));
app.set('view engine', 'hbs');

app.use('/exhibits', exhibitsController);

app.listen(9999, () => {
    console.log('Express server started at port : 9999');
});


// const 
//     _handlebars = require('handlebars'),
//     expressHandlebars = require('express-handlebars'),
//     {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// app.engine('handlebars', expressHandlebars({
//     handlebars: allowInsecurePrototypeAccess(_handlebars)
// }))







 