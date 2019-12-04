const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const db = require('./db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
app.use(cors( ));
app.use(cookieParser())

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

db.connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
    console.log(err);  
}
});

var stream = require('getstream');
// Instantiate a new client (server side)
client = stream.connect('af4d22jvc47t', process.env.APISECRET, '61753');
console.log(process.env.APISECRET)
// Instantiate a new client (client side)
// client = stream.connect('af4d22jvc47t', null, '61753');
// Find your API keys here https://getstream.io/dashboard/
// Require user routes
require('./routes/routes.js')(app);
// define a simple route
app.get('/', (req, res) => {
    // http://localhost:3000
    res.json({"message": "Welcome to Node application."});
});


