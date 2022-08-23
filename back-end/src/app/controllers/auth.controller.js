const bcrypt = require('bcryptjs');
const Admin_account = require('../models/admin_account.model');

class AuthController {
    signUp(req, res) {
        const { email, password, name } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                const newUser = new Admin_account({
                    email: email,
                    password: hash,
                    name: name,
                    image: 'https://180dc.org/wp-content/uploads/2022/04/Blank-Avatar.png'
                });
                newUser.save()
                    .then(user => {
                        res.json(user);
                    })
                    .catch(err => {
                        res.json({
                            message: err.message
                        });
                    });
            });
        });
    }                           

    signOut(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/signin');
        });
    }

    signInFailed(req, res) {
        res.json({
            message: 'Incorrect email or password',
        });
    }
}

module.exports = new AuthController();
