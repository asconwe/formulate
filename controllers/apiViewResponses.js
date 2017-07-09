const PublishedForm = require('../models/PublishedForm');

module.exports = (app) => {
    app.get('/api/responses/:id', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        const id = req.params.id;
        PublishedForm.findOne({ refId: id }, (err, response) => {
            if (err) res.status(500).json({
                success: false,
                message: `Sorry, we couldn't find that form. Please try again.`
            });
            res.status(200).json({
                success: true,
                outsiderResponses: response
            })
        });
    });
}