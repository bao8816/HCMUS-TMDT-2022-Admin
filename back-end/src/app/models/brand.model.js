const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brand = new Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Brand', Brand);
