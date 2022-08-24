require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL;
const CDN_CLOUD_NAME = process.env.CDN_CLOUD_NAME;
const CDN_API_KEY = process.env.CDN_API_KEY;
const CDN_API_SECRET = process.env.CDN_API_SECRET;

module.exports = { 
    MONGO_URI, 
    PORT,
    ADMIN_BASE_URL,
    CDN_CLOUD_NAME,
    CDN_API_KEY,
    CDN_API_SECRET 
};
