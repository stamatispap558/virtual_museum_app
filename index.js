require('dotenv').config();
const express = require("express");
const path = require("path");
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;

// Routers
const EventsDisp = require('./routers/EventsTopage');
const User = require('./models/admin_model');
const ticket = require('./routers/ticket_router');
const Eventsjs = require('./static/js/eventslist');
const ekthemata = require('./routers/ekthemata_router');
const searchrout = require('./routers/searchRout');
const login = require('./routers/logRoute');
const ticketTemp = require('./routers/ticketTempRoote');
const homepage = require('./routers/homepage_router');

// Controllers
const exhibitsController = require('./controllers/exhibitsController');
const eventsController = require('./controllers/eventsController');
const intermediateController = require('./controllers/intermediateController');
const ticketsController = require('./controllers/ticketsController');

// Session setup
app.use(session({
  name: 'login_session',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, //This sets the lifetime of the session cookie to 2 hours. 
    sameSite: 'lax',
  }
}));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to check if user is logged in
function checkAuth(req, res, next) {
  if (!req.session.loggedUserId) {
    return res.redirect('/html/login_prot.html');
  }
  next();
}

// List of routes that require session validation
const protectedRoutes = [
  '/tickets.html',
  '/list.html',
  '/intermediate.html',
  '/events.html',
  '/addTicket.html',
  '/addOrEdit.html',
  '/addEvent.html'
];

// Apply session check middleware to all protected routes
app.get(protectedRoutes, checkAuth, (req, res, next) => {
  next();  // Pass control to next middleware (static file serving)
});

app.get('/html/login_prot.html', (req, res, next) => {
  console.log("hi")
  if (req.session.loggedUserId) {
    return res.redirect('/intermediate.html');
  }
  next();
});

// Static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'static')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

// Session-based routes



// Middleware to attach session data to locals
app.use((req, res, next) => {
  res.locals.userId = req.session.loggedUserId;
  next();
});

// Routes
app.use('/ekthemata', ekthemata);
app.use('/search', searchrout);
app.use('/html/Events.html', EventsDisp);
app.use('/html/ticket_template.html', ticketTemp);
app.use('/api/homePage', homepage);
app.use('/api/give_EventsTable', Eventsjs);
app.use('/apilog', login);
app.use('/ticket', ticket);
app.use('/exhibits', exhibitsController);
app.use('/events', eventsController);
app.use('/intermediate', intermediateController);
app.use('/tickets', ticketsController);



// Connect to the database
require('./models/db');

// Start the server
app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log("Server has started on", port);
});
