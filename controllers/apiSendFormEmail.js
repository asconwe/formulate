'use strict';
const nodemailer = require('nodemailer');

module.exports = (app) => {
    app.post('/api/send/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        const { email, username, refId } = req.body;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"${username} -- formulate" <aconwellportfolio@gmail.com>`, // sender address
            to: 'august.conwell@gmail.com', // list of receivers
            subject: `You've received a formulate form from ${username}`, // Subject line
            text: `Email address: ${email}, usernmae: ${username}, & URL: http://localhost:300/#/pointed/${location}/${refId}`, // plain text body
            html: `Email address: ${email}<br>
                    username: ${username}<br> 
                    URL: http://localhost:300/#/pointed/${location}/${refId} 
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
};