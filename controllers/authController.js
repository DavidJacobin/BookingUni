const authController = require('express').Router();
const {register} = require('../services/userServices')

authController.get('/register', (req,res) => {
    res.render('register',{
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    console.log(req.body.email, req.body.username, req.body.password);
    const token = await register(req.body.email, req.body.username, req.body.password)

    res.cookie('token', token);

    res.redirect('/auth/register')
});

module.exports = authController;