const mongoose = require('mongoose');
const config = require('../../config/env_config');

async function connect() {
    try {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error: ', error);
    }
};

module.exports = { connect };
