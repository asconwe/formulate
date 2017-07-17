'use strict';
const nodemailer = require('nodemailer');

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
                const { username } = req.user;
                thisForm.pointedResponses.push({ email: email });
                const saveId = thisForm.pointedResponses[thisForm.pointedResponses.length - 1]._id;
                thisForm.save((err) => {
                    if (err) return res.status(500).json({
                        success: false,
                        message: 'There was an issue sending the email, please try again.'
                    });
                    
                    // create reusable transporter object using the default SMTP transport
                    console.log(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // secure:true for port 465, secure:false for port 587
                        auth: {
                            user: process.env.EMAIL_ADDRESS,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    });
                    
                    // setup email data
                    let mailOptions = {
                        from: `"${username} -- formulate" <aconwellportfolio@gmail.com>`, // Sender address
                        to: 'august.conwell@gmail.com', // list of receivers
                        subject: `You've received a formulate form from ${username}`, // Subject line
                        text: `Email address: ${email}, username: ${username}, & URL: http://localhost:300/#/pointed/${saveId}/${refId}`, // plain text body
                        html: `Email address: ${email}<br>
                        username: ${username}<br> 
                        URL: <a href="http://localhost:3000/#/pointed/${saveId}/${refId}">Click here to access your form</a>
                        <br>============================<br>
                        Automated delivery` // html body
                    };
                    
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.send("Error:::::" + error);
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.send("Success:::::" + info);
                    });
                });
            });
        });
    });
};