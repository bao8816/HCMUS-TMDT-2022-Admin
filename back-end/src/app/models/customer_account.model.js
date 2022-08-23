const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer_account = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        hide: true,
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    slug: { 
        type: String, 
        slug: 'email', 
        unique: true 
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now
    },
});

module.exports = mongoose.model('Customer_account', Customer_account);
