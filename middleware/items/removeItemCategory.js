var requireOption = require('../common').requireOption;

/**
 * Remove category entry from all items with the provided category id
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        if ((typeof req.body.category === 'undefined')) {

            res.tpl.error.push('Category required')

            return next();
        }

        itemModel.find({
            category: res.tpl.category._id
        }, function (err, result) {
            if ((err) || (!result)) {
                return req.redirect('/items');
            }

            result.forEach(function(item){
                item.category = '';
                item.save();
            });

            return next();
        });

    };

};