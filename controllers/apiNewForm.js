const User = require('../models/User');

module.exports = (app) => {
    app.post('/api/new/form', (req, res) => {
        if (!req.user) {
            console.log('no req.user');
            return res.status(401).json({ success: false });
        }
        console.log('req.user', req.user);
        User.findOne({ username: req.user.username }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue saving your form, please try again.'
            });
            console.log(thisUser);
            thisUser.forms.push(req.body);
            
            thisUser.save((err) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: 'There was an issue saving your form, please try again.'
                });
                return res.status(200).json({
                    success: true,
                    message: 'Form saved'
                });
            });
        });
    });
};