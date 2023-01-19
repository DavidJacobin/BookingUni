const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_S = 'rx7HyHok9GzE0XAMNdRhrSiBV87bOCgM8VCOB084E7M';

async function register (email, username, unhasedpassword){
    const existingEmail = await User.findOne({email}).collation({locale: 'en', strength: 2});;

    if(existingEmail){
        throw new Error('Email already exists!');
    }

    const existingUsername = await User.findOne({username}).collation({locale: 'en', strength: 2});;

    if(existingUsername){
        throw new Error('Username already exists!');
    }

    let password = await bcrypt.hash(unhasedpassword, 10);

    const user = await User.create({email, username, password});

    const token = createSession(user);

    return token;
};


async function login (email,password){
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2});

    if(!user){
        throw  new Error('Incorrect email or password!');
    };

    const hasMatch = await bcrypt.compare(password, user.password);

    if(hasMatch == false){
        throw new Error("Wrong passwprd!")
    };

    const token = createSession(user);
    return token;
};


async function logout (){

};


function createSession({_id,email, username}){
    const payload = {
        _id,
        email,
        username
    };

    const token = jwt.sign(payload,JWT_S)
    return token

};

function verifyToken(token){
    return jwt.verify(token, JWT_S);
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}