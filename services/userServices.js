const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_S = 'rx7HyHok9GzE0XAMNdRhrSiBV87bOCgM8VCOB084E7M';

async function register (email, username, unhasedpassword){
    const existing = await User.findOne({email});

    if(existing){
        throw new Error('Email already exists!');
    }

    let password = await bcrypt.hash(unhasedpassword, 10);

    const user = await User.create({email, username, password});

    const token = createSession(user);

    return token;
};


async function login (){

};


async function logout (){

};


function createSession({_id, username}){
    const payload = {
        _id,
        username
    };

    const token = jwt.sign(payload,JWT_S)
    return token

};

module.exports = {
    register,
    login,
    logout
}