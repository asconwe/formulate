const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');
module.exports = new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        user.validatePassword(password, (isValid) => {
            if (!isValid) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user); // Success
        })
    })
});