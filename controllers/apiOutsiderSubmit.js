const PublishedForm = require('../models/PublishedForm');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.post('/api/outsiderSubmit/:id', (req, res) => {
        console.log(req.params.id);
        PublishedForm.findOne({ refId: req.params.id }, (err, thisForm) => {
            if (err) res.status(500).json({
                success: false,
                message: 'Sorry, there was an issue finding this form. Please try again.'
            })
            thisForm.responses.push(req.body);
            thisForm.save((err) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: 'Sorry, there was an issue saving this form. Please try again.'
                });
                return res.status(200).json(thisForm);
            });
        });
    });
}