const Hotel = require("../models/Hotels");

async function create(hotel){
    return Hotel.create(hotel)
};

async function getAll(){
    return Hotel.find({}).lean();
};

async function getById(id){
    return Hotel.findById(id).lean();
};

async function updateById(id,hotel){
    return Hotel.findByIdAndUpdate(id, hotel)
};

async function deleteById(id){
    return Hotel.findByIdAndRemove(id)
};


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};