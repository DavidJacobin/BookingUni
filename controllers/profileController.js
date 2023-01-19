const profileController = require('express').Router();

profileController.get('/profile', (req, res) => {
    res.render('profile')
});

module.exports = profileController;