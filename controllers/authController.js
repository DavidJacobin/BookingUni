const authController = require('express').Router();
const {register} = require('../services/userServices');
const { errorParser } = require('../util/parser');

authController.get('/register', (req,res) => {
    res.render('register',{
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    console.log(req.body.email, req.body.username, req.body.password);

    try {

        if(req.body.email == '' || req.body.username == '' || req.body.password == ''){
            throw new Error('All feilds are required!')
        }

        if (req.body.password != req.body.rePassword){
            throw new Error('Passwords must match!')
        }
        const token = await register(req.body.email, req.body.username, req.body.password)
        
        res.cookie('token', token);
        res.redirect('/auth/register')
    } catch (error) {
        const errors = errorParser(error);


    }


});

module.exports = authController;