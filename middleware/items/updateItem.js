var requireOption = require('../common').requireOption;

/**
 * Create or modify item
 * Modify if items template field is set, create otherwise
 *  - Push errors if fields are undefined
 *  - Commit changes and redirect to /manage otherwise
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        if ((req.body.name === '') ||
            (req.body.price === '') ||
            (req.body.category === '')) {

            if(req.body.name === ''){
                res.tpl.error.push('Name required')
            }

            if(req.body.price === ''){
                res.tpl.error.push('Price required')
            }

            if(req.body.category === ''){
                res.tpl.error.push('Category required')
            }

            return next();
        }

        var item = undefined;
        if (typeof res.tpl.item !== 'undefined') {
            item = res.tpl.item;
        } else {
            item = new itemModel();
        }
        item.name = req.body.name;
        item.price = req.body.price;
        item.category = req.body.category;
        item.description = req.body.description;

        item.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};