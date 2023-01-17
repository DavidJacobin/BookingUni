const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/booking';

module.exports = async (app) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/booking',{useNewUrlParser: true});

        console.log('DB connected!');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};