const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');
console.log('new local strat?')
module.exports = new LocalStrategy((username, password, done) => {
    console.log('singup')
    const newUser = new User({ username: username.trim(), password: password.trim() });
    newUser.save((err) => { 
        if (err) return done(err);
        return done(null);
    })
});    