module.exports = (app) => {
    app.get('/api/data', (req, res) => {
        const testing = ['=========================================', req.session, '===================================', req.user];
        console.log(testing);
        res.json(testing);
    });
}