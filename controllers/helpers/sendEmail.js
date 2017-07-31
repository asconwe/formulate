'use strict'
const nodemailer = require('nodemailer');

module.exports = function (req, res, mailOptions, callback) {
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
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send("Error:::::" + error);
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        callback();
}