const {Schema, model} = require('mongoose');

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters! ']
    },
    password: {
        type: String,
        required: true
    },
});

const User = model('User', userSchema);

module.exports = User;