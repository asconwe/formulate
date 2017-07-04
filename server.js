// Modules
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const passport = require('passport');
const mongoose = require('mongoose');


// Controllers
const htmlRoot = require('./controllers/htmlRoot');
const apiSignup = require('./controllers/apiSignup')
const apiAuth = require('./controllers/apiAuth');

// Express Port/App Declaration
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.static(__dirname + "/public"));
app.use('/minicss', express.static(__dirname + '/node_modules/mini.css/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(passport.initialize());
app.use(passport.session());

// Database configuration
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect("mongodb://localhost/formulate")
}
const db = mongoose.connection;

//=== Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

//==== Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//==== Call controllers
htmlRoot(app);
apiAuth(app);
apiSignup(app);

// Connection to PORT
app.listen(PORT, function () {
  console.log(`Listening On Port: ${PORT}`);
});
