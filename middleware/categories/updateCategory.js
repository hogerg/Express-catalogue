var requireOption = require('../common').requireOption;

/**
 * Create or modify category
 * Modify if categories template field is set, create otherwise
 *  - Push errors if fields are undefined
 *  - Commit changes and redirect to /manage otherwise
 */

module.exports = function (objectrepository) {

    var categoryModel = requireOption(objectrepository, 'categoryModel');

    return function (req, res, next) {

        if (typeof req.body.name === 'undefined'){
            res.tpl.error.push('Name required')

            return next();
        }

        var category = undefined;
        if (typeof res.tpl.category !== 'undefined') {
            category = res.tpl.category;
        } else {
            category = new categoryModel();
        }
        category.name = req.body.name;

        category.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};