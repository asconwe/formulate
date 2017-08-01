const mongoose = require('mongoose');

const User = require('../models/User');
const PublishedForm = require('../models/PublishedForm')

const saveForm = (thisPublishedForm, res, callback) => {
    thisPublishedForm.save((saveErr) => {
        if (saveErr) {
            return res.status(500).json({
                success: false,
                message: 'There was an issue publishing your form, please try again.'
            });
        }
        callback();
    });
}

const saveUser = (thisUser, res) => {
    thisUser.save((userSaveErr) => {
        if (userSaveErr) res.status(500).json({
            success: false,
            message: 'There was an issue publishing your form, please try again.'
        })
        return res.status(200).json({
            success: true,
            message: 'Form published!'
        });
    })
}

module.exports = (app) => {
    app.get('/api/publish/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        
        User.findOne({ email: req.user.email }, (err, thisUser) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'There was an issue publishing your form, please try again.'
            });

            const id = mongoose.Types.ObjectId(req.params.id);
            const formToPublish = thisUser.forms.id(id);
            formToPublish.refId = req.params.id;
            const thisPublishedForm = new PublishedForm({
                formTitle: formToPublish.formTitle,
                elements: formToPublish.elements,
                refId: formToPublish.refId
            });
            thisUser.forms.id(id).published = true;
            PublishedForm.findOne({ refId: req.params.id }, (err, foundForm) => {
                if (err) {
                    saveForm(thisPublishedForm, res, () => {
                        saveUser(thisUser, res);
                    });
                } else if (!foundForm) {
                    saveForm(thisPublishedForm, res, () => {
                        saveUser(thisUser, res);
                    });
                } else {
                    saveUser(thisUser, res);
                }
            });
        });
    });
};