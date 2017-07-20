const mongoose = require('mongoose');

const User = require('../models/User');

module.exports = (app) => {
    app.delete('/api/delete/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue deleting your form, please try again.'
            });
            const id = mongoose.Types.ObjectId(req.params.id);
            if (!thisUser.forms.id(id)) {
                return res.status(500).json({
                    success: false,
                    message: 'There was an issue deleting your form, please try again.'
                });
            }
            thisUser.forms.id(id).remove();
            thisUser.save((err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'There was an issue deleting your form, please try again.'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Form deleted',
                });
            });
        });
    });
};