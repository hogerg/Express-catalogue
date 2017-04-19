var requireOption = require('../common').requireOption;

/**
 * Set res.tpl.categories template field to the list of all categories in DB
 */

module.exports = function (objectrepository) {

    var categoryModel = requireOption(objectrepository, 'categoryModel');

    return function (req, res, next) {

        categoryModel.find({

        }, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.categories = results;
            return next();
        });
    };

};