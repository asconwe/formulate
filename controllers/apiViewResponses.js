const PublishedForm = require('../models/PublishedForm');

const countWords = require('./helpers/analyzeResponse');

module.exports = (app) => {
    app.get('/api/responses/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        const id = req.params.id;
        PublishedForm.findOne({ refId: id }, (err, form) => {
            if (err) return res.status(500).json({
                success: false,
                message: `Sorry, we couldn't find that form. Please try again.`
            });
            const wordArr = form.responses.reduce((a, b) => {
                return a.concat(b);
            });
            console.log(wordArr);
            const wordCounts = countWords(wordArr);
            const aggregateResponse = Object.assign({}, form, wordCounts);
            return res.status(200).json({
                success: true,
                outsiderResponses: aggregateResponse
            });
        });
    });
};