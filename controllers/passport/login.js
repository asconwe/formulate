const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User model
const User = require('../../models/User');
console.log('new local strategy?')
module.exports = new LocalStrategy((username, password, done) => {
    console.log('in login strategy');
    User.findOne({ username: username }, (err, user) => {
        console.log('in find one callback');
        if (err) { return done(err); }
        user.validatePassword(password, (isValid) => {
            if (!user || !isValid) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        })
    })
});