const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, 
    phonenumber: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Customer', customerSchema);