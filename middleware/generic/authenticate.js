/**
 * Redirect to login page if the user is not yet logged in
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        }

        res.tpl.sid = req.session.userid;

        return next();
    };

};