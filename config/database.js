const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/booking';

module.exports = async (app) =>{
    try {
        await mongoose.connect('CONNECTION_STRING', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB connected!');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};