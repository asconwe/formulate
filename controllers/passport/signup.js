const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');

module.exports = new LocalStrategy((username, password, done) => {
    const newUser = new User({ username: username.trim(), password: password.trim() });
    newUser.save((err) => { 
        if (err) return done(err);
        return done(null);
    })
});    