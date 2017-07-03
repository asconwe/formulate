const passport = require('passport');
const localSignupStrategy = require('./passport/signup');
const validateSignupForm = require('./passport/validateSignup');

passport.use('local-signup', localSignupStrategy);

module.exports = (app) => {
    app.post('/auth/signup', (req, res, next) => {
        const validationResult = validateSignupForm(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }
        return passport.authenticate('local-signup', (err) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // the 11000 Mongo code is for a duplication email error
                    // the 409 HTTP status code is for conflict error
                    return res.status(409).json({
                        success: false,
                        message: 'Check the form for errors.',
                        errors: {
                            username: 'This username is already in use.'
                        }
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            });
        })(req, res, next);
    });
}
