const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');
module.exports = new LocalStrategy((email, password, done) => {
    const newUser = new User({ email: email.trim(), password: password.trim(), verified: false });
    newUser.save((err) => { 
        if (err) return done(err);
        return done(null);
    })
});    