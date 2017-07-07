const mongoose = require('mongoose');

const User = require('../models/User');

module.exports = (app) => {
    app.post('/api/edit/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue saving your form, please try again.'
            });
            
            const id = mongoose.Types.ObjectId(req.params.id);
            thisUser.forms.id(id).remove();
            const newForm = req.body;
            newForm._id = id;
            thisUser.forms.unshift(newForm);
            thisUser.save((err) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: 'There was an issue saving your form, please try again.'
                });
                const refId = req.params.id;
                return res.status(200).json({
                    success: true,
                    message: 'Form saved',
                    refId: refId.toString()
                });
            });
        });
    });
};