var requireOption = require('../common').requireOption;

/**
 * Set res.tpl.items template field to the list of filtered items in DB
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        var keyword = req.param('keyword');
        var category = '.*';
        if(req.param('category') !== '0') {
            category = req.param('category');
            itemModel.find({
                name: new RegExp(keyword, "i"),
                category: category
            }, function (err, results) {
                if (err) {
                    return next(err);
                }

                res.tpl.items = results;
                return next();
            });
        }

        itemModel.find({
            name: new RegExp(keyword, "i"),
        }, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.items = results;
            return next();
        });
    };

};