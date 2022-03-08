const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,
    balance: {
        type: Number,
        required: 100
    },                               // Default balance at user registration is 100
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"]
    },
    isFreeAppUser: false,

    },

 {timestamps: true});

module.exports = mongoose.model('user', userSchema) 
