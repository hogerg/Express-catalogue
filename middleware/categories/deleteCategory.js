var requireOption = require('../common').requireOption;

/**
 * Delete Category object
 */

module.exports = function (objectrepository) {

    var categoryModel = requireOption(objectrepository, 'categoryModel');

    return function (req, res, next) {

        if (typeof res.tpl.category === 'undefined') {
            return next();
        }

        res.tpl.category.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });

    };

};