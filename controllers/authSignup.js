// Modules
const passport = require('passport');
const localSignupStrategy = require('./passport/signup');
const validateSignupForm = require('./passport/validateSignup');

console.log(localSignupStrategy._verify.toString());

const localSignup = 'local-signup'

passport.use(localSignup, localSignupStrategy);

module.exports = (app) => {
    app.post('/auth/signup', (req, res, next) => {
        console.log(req.body);
        const validationResult = validateSignupForm(req.body);
        console.log(validationResult);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        return passport.authenticate(localSignup, (err) => {
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
