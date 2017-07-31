// Modules
const passport = require('passport');
const localSignupStrategy = require('./passport/signup');
const validateSignupForm = require('./passport/validateSignup');

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
            // setup email data
            let mailOptions = {
                from: `"${username} -- formulate" <${username}>`, // Sender address
                to: `${email}`, // list of receivers
                subject: `You've received a formulate form from ${username}`, // Subject line
                text: `Email address: ${email}, username: ${username}, & URL: ${base}/#/pointed/${saveId}/${refId}`, // plain text body
                html: `Email address: ${email}<br>
                username: ${username}<br> 
                URL: <a href="${base}/#/pointed/${saveId}/${refId}">Click here to verify your email address</a>
                <br>============================<br>
                Automated delivery` // html body
            };
            // send email then in call back send response
            sendEmail(req, res, mailOptions, () => {
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully signed up! Now you should be able to log in.'
                });
            })
        })(req, res, next);
    });
}
