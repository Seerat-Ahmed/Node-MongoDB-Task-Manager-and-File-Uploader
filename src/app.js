const express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    fs = require('fs'),
    expressValidator = require('express-validator'),
    jwt = require('jsonwebtoken'),
    flash = require('connect-flash'),
    methodOvveride = require('method-override'),
    session = require('express-session'),
    config = require('../config/database'),
    todoRoute = require('./routes/api/todo'),
    userRoute = require('./routes/api/user');
    fileRoute = require('./routes/api/files');

// Setting port
const port = 4000;

// Connecting to MongoDB
const db = mongoose.connect(config.db.uri);

// Checking for connection
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to mongoose');
});

// Checking for error
mongoose.connection.on('error', (error) => {
    console.log('failed to connect', error);
});


// Creating server
const app = express();

app.set('trust proxy', 1);


// Setting up middlewares
app.use(express.static(__dirname + '/public')); // Setting static files
app.use(morgan('dev')); // log every request
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(methodOvveride());
app.use(cors());
app.use(session({
    secret: 'Vortechs',
    resave: 'false',
    saveUninitialized: true,
    cookie: {}
}));


// Setting Routes
app.use('/', todoRoute);
app.use('/', userRoute);
app.use('/', fileRoute);



// Server is listening
app.listen(port, () => {
    console.log('server is up and running at ', port);
});