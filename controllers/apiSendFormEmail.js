'use strict';
const sendEmail = require('./helpers/sendEmail')
const User = require('../models/User');
const PublishedForm = require('../models/PublishedForm');

module.exports = (app) => {
    app.post('/api/send/:refId', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue sending the email, please try again.'
            });
            PublishedForm.findOne({ refId: req.params.refId }, (err, thisForm) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: 'There was an issue sending the email, please try again.'
                });
                const { refId } = req.params;
                const { email } = req.body;
                const userEmail = req.user.email;
                thisForm.pointedResponses.push({ email: email });
                const saveId = thisForm.pointedResponses[thisForm.pointedResponses.length - 1]._id;
                thisForm.save((err) => {
                    if (err) return res.status(500).json({
                        success: false,
                        message: 'There was an issue sending the email, please try again.'
                    });
                    
                    const base = 'https://www.formulate.fyi' // 'http://localhost:3000' : 'https://formulate-fyi.herokuapp.com';
                    // setup email data
                    let mailOptions = {
                        from: `<${userEmail}>`, // Sender address
                        to: `<${email}>`, // list of receivers
                        subject: `You've received a formulate form from ${userEmail}`, // Subject line
                        text: `Email address: ${userEmail}, URL: ${base}/#/pointed/${saveId}/${refId}`, // plain text body
                        html: `Email address: ${userEmail}<br>
                        URL: <a href="${base}/#/pointed/${saveId}/${refId}">Click here to access your form</a>
                        <br>============================<br>
                        Automated delivery` // html body
                    };
                    

                    return sendEmail(mailOptions, (error, info) => {
                        if (error) return res.status(500).json({
                            success: false,
                            message: 'Failed to send verification email. Verification email should resend'
                        })
                        res.send("Success:::::" + info);
                    });
                });
            });
        });
    });
};