const Hotel = require("../models/Hotels");

async function create(hotel){
    return Hotel.create(hotel)
};


module.exports = {
    create,
};