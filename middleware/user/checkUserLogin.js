var requireOption = require('../common').requireOption;
var pwHash = require('password-hash');

/**
 * Check user credentials and allow login on success
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    function validateEmail(email) {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/
        return re.test(email);
    }

    return function (req, res, next) {

        if (req.body.email === '' ||
            !validateEmail(req.body.email) ||
            req.body.password === '') {

            if(req.body.email === ''){
                res.tpl.error.push('Email address required');
            }

            if(!validateEmail(req.body.email)){
                res.tpl.error.push('Valid Email address required');
            }

            if(req.body.password === ''){
                res.tpl.error.push('Password required');
            }

            res.tpl.email = req.body.email;

            return next();
        }

        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('The provided Email address is not yet registered');
                return next();
            }

            if (!pwHash.verify(req.body.password, result.password)) {
                res.tpl.error.push('Wrong password');
                return next();
            }

            req.session.userid = result._id;
            req.session.email = result.email;

            return res.redirect('/');
        });
    };

};