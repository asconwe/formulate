const PublishedForm = require('../models/PublishedForm');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.post('/api/pointedSubmit/:id/:saveId', (req, res) => {
        console.log(req.params.id);
        PublishedForm.findOne({ refId: req.params.id }, (err, thisForm) => {
            if (err) res.status(500).json({
                success: false,
                message: 'Sorry, there was an issue finding this form. Please try again.'
            })
            const save_id = mongoose.Types.ObjectId(req.paras.saveId);
            const responseToUpdate = thisForm.PointedResponses(save_id).remove();
            const updatedResponse = Object.assign({}, responseToUpdate, { response: req.body.responses })
            thisForm.PointedResponses.push(updatedResponse);
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