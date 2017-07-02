
module.exports = (app) => {
    // Routes
    app.get(`*`, function (req, res) {
        res.sendFile('public/index.html', { root: __dirname });
    });
}