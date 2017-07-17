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
            const responseObj = thisForm.pointedResponses.id(save_id) || { response: [] };
            console.log('=================', thisForm.pointedResponses);
            console.log('-------------------', req.params.saveId);
            const responseForm = Object.assign({}, {
                formTitle: thisForm.formTitle,
                elements: thisForm.elements,
                responses: responseObj.response
            });
            return res.status(200).json(responseForm);
        });
    });
};