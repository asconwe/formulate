require('dotenv').config();

// Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('cookie-session');
const requireHTTPS = require('./requireHTTPS');

// Controllers
const authSignup = require('./controllers/authSignup');
const authLogin = require('./controllers/authLogin');
const authLogout = require('./controllers/authLogout');
const apiData = require('./controllers/apiData');
const apiNewForm = require('./controllers/apiNewForm');
const apiEditForm = require('./controllers/apiEditForm');
const apiDeleteForm = require('./controllers/apiDeleteForm');
const apiPublishForm = require('./controllers/apiPublishForm');
const apiOutsider = require('./controllers/apiOutsider');
const apiOutsiderSubmit = require('./controllers/apiOutsiderSubmit');
const apiViewResponses = require('./controllers/apiViewResponses');
const apiSendFormEmail = require('./controllers/apiSendFormEmail');
const apiPointedOutsider = require('./controllers/apiPointedOutsider');
const apiPointedSave = require('./controllers/apiPointedSave');
const apiPointedSubmit = require('./controllers/apiPointedSubmit');

// Express Port/App Declaration
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(requireHTTPS);
app.use(express.static(__dirname + "/public"));
app.use('/.well-known/acme-challenge/', express.static(__dirname + "/cert"));
app.use('/minicss', express.static(__dirname + '/node_modules/mini.css/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser('striped-shirt'));
app.use(session({
    secret: 'striped-shirt',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Database configuration
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost/formulate");
}
const db = mongoose.connection;

//=== Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

//==== Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//==== Call controllers
authLogin(app);
authSignup(app);
authLogout(app);
apiData(app);
apiNewForm(app);
apiEditForm(app);
apiDeleteForm(app);
apiPublishForm(app);
apiOutsider(app);
apiOutsiderSubmit(app);
apiViewResponses(app);
apiSendFormEmail(app);
apiPointedOutsider(app);
apiPointedSave(app);
apiPointedSubmit(app);

// Connection to PORT
app.listen(PORT, function () {
    console.log(`Listening On Port: ${PORT}`);
});
