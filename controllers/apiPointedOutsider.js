const PublishedForm = require('../models/PublishedForm');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.get('/api/pointedOutsiderForm/:id/:saveId', (req, res) => {
        PublishedForm.findOne({ refId: req.params.id }, (err, thisForm) => {
            if (err) return res.status(500).json({
                success: false,
                message: 'Sorry, there was an issue finding this form. Please try again'
            });
            const save_id = mongoose.Types.ObjectId(req.params.saveId);
            const responses = thisForm.pointedResponses.id(save_id).responses;
            const responseForm = Object.assign({}, {
                formTitle: thisForm.formTitle,
                elements: thisForm.elements,
                responses: responses
            })
            return res.status(200).json(responseForm);
        })
    });
}