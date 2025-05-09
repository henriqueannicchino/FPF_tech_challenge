const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Allows sending data to the application in Json format
app.use(express.json());
app.use(cors(/* IP */));


//nInitialize the DB
const mongoosInputConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

/*************local connection beggining*************/

const DATABASE_URL = `mongodb://mongodb:27017/warriorPath`;

/*************local connection ending*************/


/*************Atlas connection beggining*************/

//const DATABASE_URL = process.env.CONNECTION_URL; // DATABASE_URL;

/*************Atlas connection ending*************/

mongoose.connect(
	DATABASE_URL,
	mongoosInputConfig,
);

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded")
});

requireDir('./src/models');

app.use('/', require("./src/routes"));

let port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Servidor funcionando em ' + port);
});