const { create } = require('../services/hotelServices');
const { errorParser } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) =>{
    res.render('details');
});

hotelController.get('/create', (req, res) =>{
    res.render('create')
});


hotelController.post('/create', async(req, res) =>{
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        bookings: req.body.bookings,
        owner: req.user._id,
    };

    try {
         await create(hotel);
        res.redirect('/')
        
    } catch (err) {
        res.redirect('/create', {
            title: "Create Hotel",
            body: hotel,
            errors: errorParser(err)
        })
    }
});

hotelController.get('/:id/edit', (req, res) =>{
    res.render('edit')
});


module.exports = hotelController;