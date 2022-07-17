const mongoose = require('mongoose');
require('dotenv').config();
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    slug: { type: String, slug: 'name', slug_padding_size: 4, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    image: { type: String, required: true },
    category: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', Product);
