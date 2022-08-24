const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Admin_account = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
        default: 'admin'
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

// var options = {
//     errorMessages: {
//         MissingPasswordError: 'No password was given',
//         AttemptTooSoonError: 'Account is currently locked. Try again later',
//         TooManyAttemptsError: 'Account locked due to too many failed login attempts',
//         NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
//         IncorrectPasswordError: 'Password is incorrect',
//         IncorrectUsernameError: 'Username is incorrect',
//         MissingUsernameError: 'No username was given',
//         UserExistsError: 'A user with the given username is already registered'
//     }
// };

// Admin_account.plugin(passportLocalMongoose, options);


module.exports = mongoose.model('Admin_account', Admin_account);
