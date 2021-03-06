// Modules
const passport = require('passport');
const localSignupStrategy = require('./passport/signup');
const validateSignupForm = require('./passport/validateSignup');
const sendEmail = require('./helpers/sendEmail');
const localSignup = 'local-signup'

passport.use(localSignup, localSignupStrategy);

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
        
        return passport.authenticate(localSignup, (err, user, info) => {
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
            // setup email data
            const _id = user._id.toString();
            const base = 'http://www.formulate.fyi';
            let mailOptions = {
                from: `"formulate" <formulatefyi@gmail.com>`, // Sender address
                to: `${req.body.email}`, // list of receivers
                subject: `Verifiy your formulate account!`, // Subject line
                text: `Email address: ${req.body.email}, & URL: ${base}/auth/verify/${_id}`, // plain text body
                html: `Email address: ${req.body.email}<br>
                    URL: <a href="${base}/auth/verify/${_id}">Click here to verify your email address, and start building forms!</a>
                    <br>============================<br>
                    Automated delivery` // html body
            };
            // send email then in call back send response
            sendEmail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: 'Could not send verification email.'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully signed up! Now you should be able to log in.'
                });
            });
        })(req, res, next);
    });
}
