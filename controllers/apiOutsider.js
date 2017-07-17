const PublishedForm = require('../models/PublishedForm');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.get('/api/outsiderForm/:id', (req, res) => {
        PublishedForm.findOne({ refId: req.params.id }, (err, thisForm) => { 
            if (err) return res.status(500).json({
                success: false,
                message: 'Sorry, there was an issue finding this form. Please try again'
            });
            const responseForm = Object.assign({}, {
                formTitle: thisForm.formTitle,
                elements: thisForm.elements
            })
            return res.status(200).json(responseForm);
        })
    });
}