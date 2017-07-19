

module.exports = (app) => {
    app.get('/api/data', (req, res) => {
    	console.log(req.user);
        if (!req.user) {
            return res.status(401).json({ success: false });
        }
        return res.status(200).json({
            success: true,
            user: req.user.username,
            forms: req.user.forms
        });
    });
};