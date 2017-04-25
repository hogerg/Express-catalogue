/**
 * Sets session template field if the user is logged in
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            res.tpl.session = {};
            res.tpl.session.sid = req.session.userid;
            res.tpl.session.email = req.session.email;
        }

        return next();
    };

};