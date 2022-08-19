const Admin_account = require('../models/admin_account.model');
const Admin_profile = require('../models/admin_profile.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

class AuthController {
    signUp(req, res) {
        const { email, password, name } = req.body;
        Admin_account.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ message: 'Username already exists' });
                } else {
                    const newUser = new Admin_account({
                        email,
                        password
                    });
                    // Create new profile for new user
                    const newProfile = new Admin_profile({
                        email,
                        name,
                        gender: '',
                        image: '',
                    });
                    newProfile.save();

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.redirect('/signin');
                                }).catch(err => {
                                    res.status(500).json({ message: err.message });
                                });
                        });
                    });
                }
            });
    }
}

module.exports = new AuthController();
