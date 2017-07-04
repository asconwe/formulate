// Modules
const passport = require('passport');
const LocalLoginStrategy = require('./passport/login');
const validateLoginForm = require('./passport/validateLogin')

console.log(LocalLoginStrategy._verify.toString());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const localLogin = 'something';

passport.use(localLogin, LocalLoginStrategy);


module.exports = (app) => {
    app.post('/auth/login', (req, res, next) => {
        const validationResult = validateLoginForm(req.body);
        if (!validationResult.success) {
            console.log('not valid')
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }
        console.log('before passport.authenticate');
        return passport.authenticate(localLogin, (err, user) => {
            console.log('in the callback');
            if (err) {
                console.log('err in database')
                return res.status(409).json({
                    success: false,
                    message: 'There was an issue accessing the database, please try again later'
                })
            }
            if (!user) {
                console.log('not a match');
                return res.status(400).json({
                    success: false,
                    message: 'Username and password did not match an account in our database'
                })
            }
            console.log('supposed success');
            return res.status(200).json({
                success: true,
                message: 'You are logged in'
            });
        })(req, res, next);
    });
}

