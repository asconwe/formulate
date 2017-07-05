module.exports = (app) => {
    app.post('/api/new/form', (req, res) => {
        if (!req.user) {
            console.log('no req.user');
            return res.status(401).json({ success: false });
        }
        // User.findOne({})
        
        //     if (err) return res.status(500).json({
        //         success: false,
        //         message: 'There was an issue saving your form, please try again.'
        //     });


        //     res.status(200).json({
        //         success: true,
        //         user: req.user.username,
        //         forms: req.user.forms
        //     })
        // })
        
    });
}