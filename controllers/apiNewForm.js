const User = require('../models/User');

module.exports = (app) => {
    app.post('/api/new/form', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ email: req.user.email }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue saving your form, please try again.'
            });

            const form = req.body;
            form.published = false;
            thisUser.forms.unshift(form);
            const refId = thisUser.forms[0]._id;
            thisUser.save((err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'There was an issue saving your form, please try again.'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Form saved',
                    refId: refId.toString()
                });
            });
        });
    });
};