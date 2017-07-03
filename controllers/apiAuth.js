// Modules
const passport = require('passport');
const LocalLoginStrategy = require('./passport/login');
const validateLoginForm = require('./passport/validateLogin')

passport.use('local-login', LocalLoginStrategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = (app) => {
    app.post('/auth/login', (req, res, next) => {
        const validationResult = validateLoginForm(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }
        return passport.authenticate('local-login', (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password did not match an account in our database'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'You are logged in'
            })
        })
    });
}

