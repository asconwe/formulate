const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');

module.exports = new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
});