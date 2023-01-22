const Hotel = require("../models/Hotels");

async function create(hotel){
    return Hotel.create(hotel)
};

async function getAll(){
    return Hotel.find({}).lean();
};


module.exports = {
    create,
    getAll
};