var requireOption = require('../common').requireOption;

/**
 * Delete Item object
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        if (typeof res.tpl.item === 'undefined') {
            return next();
        }

        res.tpl.item.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });

    };

};