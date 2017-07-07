const mongoose = require('mongoose');

const User = require('../models/User');
const PublishedForm = require('../models/PublishedForm')

module.exports = (app) => {
    app.post('/api/publish/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue publishing your form, please try again.'
            });
            
            const id = mongoose.Types.ObjectId(req.params.id);
            const formToPublish = thisUser.forms.id(id);
            formToPublish.refId = req.params.id;
            const thisPublishedForm = new PublishedForm({ formToPublish });
            thisPublishedForm.save((err) => {
                if (err) res.status(500).json({
                    success: false,
                    message: 'There was an issue publishing your form, please try again'
                });
            });
            res.status(200).json({
                success: true,
                message: 'Form published!'
            });
        });
    });
};