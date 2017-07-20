const PublishedForm = require('../models/PublishedForm');

const { countWords, makeArrayOfWords } = require('./helpers/analyzeResponse');

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
            if (form.responses.length > 0) {
                console.log(form.responses);
                // Count words
                const wordArr = form.responses.map((uniqueForm, index) => {
                    return uniqueForm.response.content.reduce((a, b) => {
                        if (typeof a === typeof 'String') {
                            return [a].concat(makeArrayOfWords(b));
                        }
                        return a.concat(makeArrayOfWords(b));
                    });
                }).reduce((a, b) => a.concat(b));
                const wordCounts = countWords(wordArr);
                const sortedWordCountArr = wordCounts.sort((a, b) => {
                    return b.value - a.value;
                })
                const aggregateResponse = Object.assign({}, {
                    elements: form.elements,
                    formTitle: form.formTitle,
                    responses: form.responses
                }, { wordCounts: sortedWordCountArr });
                return res.status(200).json({
                    success: true,
                    outsiderResponses: aggregateResponse
                });
            }
            return res.status(404).json({
                success: false,
                message: 'No responses received yet'
            })
        });
    });
};