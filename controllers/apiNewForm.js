const User = require('../models/User');
const SavedForm = require('../models/SavedForm');

module.exports = (app) => {
    app.post('/api/new/form', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue saving your form, please try again.'
            });
            thisUser.forms.unshift(req.body);
            thisUser.save((err) => {
                if (err) {
                    console.log('thisUser.save error', err)
                    return res.status(500).json({
                        success: false,
                        message: 'There was an issue saving your form, please try again.'
                    });
                }
                const refId = thisUser.forms[0]._id;
                const user = thisUser.username;
                const thisForm = new SavedForm({ refId, user });
                thisForm.save((err) => {
                    if (err) {
                        console.log('thisUser.save error', err)
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
    });
};