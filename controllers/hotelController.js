const { create, getById, updateById, deleteById } = require('../services/hotelServices');
const { errorParser } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id)


    if (req.user) {
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true
        }
    }
    res.render('details', {
        hotel
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create')
});


hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    };

    try {
        await create(hotel);
        res.redirect('/');

    } catch (err) {
        res.render('create', {
            title: "Create Hotel",
            body: hotel,
            errors: errorParser(err)
        });
    }
});

hotelController.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id)

    res.render('edit', {
        hotel
    });
});

hotelController.post('/:id/edit', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    };

    if (hotel.owner != req.user._id) {
        res.redirect('/')
    }

    try {
        await updateById(req.params.id, hotel);
        res.redirect('/');

    } catch (err) {
        res.render('create', {
            title: "Edit Hotel",
            body: hotel,
            errors: errorParser(err)
        });
    }
});

hotelController.get('/:id/delete', async (req, res) => {
    const hotel = await getById(req.params.id)

    if (hotel.owner != req.user._id) {
        res.redirect('/')
    }
    await deleteById(req.params.id)
    res.redirect('/')
});


module.exports = hotelController;