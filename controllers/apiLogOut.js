module.exports = (app) => {
    app.post('/api/logout', (req, res) => {

        req.logout();
        res.json({ logout: success });
    });
}