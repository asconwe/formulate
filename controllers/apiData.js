

module.exports = (app) => {
    app.get('/api/data', (req, res) => {
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        if (req.user.verified) {
            return res.status(200).json({
                success: true,
                user: req.user.username,
                forms: req.user.forms,
                verified: true
            });
        }
         return res.status(200).json({
            success: true,
            verified: false
        });
    });
};