const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Admin_account = require('../models/admin_account.model');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Admin_profile = new Schema({
    email: {type: String, required: true, ref: 'Admin_account'},
    name: {type: String, required: true},
    gender: String,
    slug: { type: String, slug: 'email', unique: true },
    image: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    }
);

module.exports = mongoose.model('Admin_profile', Admin_profile);
