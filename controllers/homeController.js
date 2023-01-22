const { getAll } = require('../services/hotelServices');

const homeController = require('express').Router();


homeController.get('/', async (req, res) =>{
    const hotels = await getAll()
    res.render('home',{ 
        hotels});
});

module.exports = homeController;