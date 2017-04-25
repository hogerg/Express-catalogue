var requireOption = require('../common').requireOption;
var pwHash = require('password-hash');

/**
 * Create new user if the provided Email is not yet registered
 */
module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    function validateEmail(email) {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/
        return re.test(email);
    }

    return function (req, res, next) {

        if (req.body.email === '' ||
            !validateEmail(req.body.email) ||
            req.body.password === '' ||
            req.body.password_confirm === '') {

            if(req.body.email === ''){
                res.tpl.error.push('Email address required');
            }

            if(!validateEmail(req.body.email)){
                res.tpl.error.push('Valid Email address required');
            }

            if(req.body.password === ''){
                res.tpl.error.push('Password required');
            }

            if(req.body.password_confirm === ''){
                res.tpl.error.push('Password confirmation required');
            }

            if(req.body.password !== req.body.password_confirm){
                res.tpl.error.push('Password and confirmation have to match');
            }

            res.tpl.email = req.body.email;

            return next();
        }

        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {

            if ((err) || (result !== null)) {
                res.tpl.error.push('The provided Email address is already registered');
                return next();
            }

            var newUser = new UserModel();
            newUser.email = req.body.email;
            newUser.password = pwHash.generate(req.body.password);
            newUser.save(function (err) {
                return res.redirect('/login');
            });
        });
    };
};