const PublishedForm = require('../models/PublishedForm');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.post('/api/pointedSave/:id/:saveId', (req, res) => {
        console.log(req.params.id);
        PublishedForm.findOne({ refId: req.params.id }, (err, thisForm) => {
            if (err) res.status(500).json({
                success: false,
                message: 'Sorry, there was an issue finding this form. Please try again.'
            });
            const save_id = mongoose.Types.ObjectId(req.params.saveId);
            const responseToUpdate = thisForm.pointedResponses.id(save_id);
            // const updatedResponse = Object.assign({}, responseToUpdate[0], { response: req.body });
            responseToUpdate.response = req.body;
            responseToUpdate.remove();
            thisForm.pointedResponses.push(responseToUpdate);
            thisForm.save((err) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: 'Sorry, there was an issue saving this form. Please try again.'
                });
                return res.status(200).json(thisForm);
            });
        });
    });
};