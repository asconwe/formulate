const mongoose = require('mongoose');

const User = require('../models/User');
const PublishedForm = require('../models/PublishedForm')

module.exports = (app) => {
    app.get('/api/publish/:id', (req, res) => {
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
            console.log(formToPublish);
            formToPublish.refId = req.params.id;
            console.log(req.params.id);
            const thisPublishedForm = new PublishedForm({
                formTitle: formToPublish.formTitle,
                elements: formToPublish.elements,
                refId: formToPublish.refId
            });
            console.log(thisPublishedForm);
            PublishedForm.findOne({ refId: req.params.id }, (err, foundForm) => {
                if (err) {
                    thisPublishedForm.save((saveerr) => {
                        if (saveerr) {
                            console.log(saveerr);
                            return res.status(500).json({
                                success: false,
                                message: 'There was an issue publishing your form, please try again'
                            });
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Form published!'
                        });

                    });
                } else if (!foundForm) {
                    thisPublishedForm.save((saveerr) => {
                        if (saveerr) {
                            console.log(saveerr);
                            return res.status(500).json({
                                success: false,
                                message: 'There was an issue publishing your form, please try again'
                            });
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Form published!'
                        });

                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: 'Form published!'
                    });
                }
            });
        });
    });
};