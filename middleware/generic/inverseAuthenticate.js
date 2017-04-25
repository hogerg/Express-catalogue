/**
 * Redirect to /items if the user is already logged in
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/items');
        }
        return next();
    };

};