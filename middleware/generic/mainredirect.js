/**
 * Created by hodanygergo on 2017.02.21..
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        return res.redirect('/items');

        /*if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/felvetelek');
        }*/
    };

};