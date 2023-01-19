const authController = require('express').Router();
const {register,login} = require('../services/userServices');
const { errorParser } = require('../util/parser');
const validator = require('validator')

authController.get('/register', (req,res) => {
    res.render('register',{
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    console.log(req.body.email, req.body.username, req.body.password);

    try {

        // if(validator.isEmail( req.body.email)){
        //     throw new Error('Ivalid email!')
        // }

        if(req.body.email == '' || req.body.username == '' || req.body.password == ''){
            throw new Error('All feilds are required!')
        }

        if (req.body.password != req.body.rePassword){
            throw new Error('Passwords must match!')
        }
        const token = await register(req.body.email, req.body.username, req.body.password)
        
        res.cookie('token', token);
        res.redirect('/')
    } catch (error) {
        const errors = errorParser(error);
    }
});

authController.get('/login', (req, res) =>{
    res.render('login')
});

authController.post('/login',async (req, res) => {
    try {
        const token = await login(req.body.email ,req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/')
    } catch (error) {
        const errors = errorParser(error);
    };
});


authController.get('/logout', (req, res) =>{
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = authController;