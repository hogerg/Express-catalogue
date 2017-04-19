var requireOption = require('../common').requireOption;

/**
 * Set res.tpl.items template field to the list of all items in DB
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        itemModel.find({

        }, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.items = results;
            return next();
        });
    };

};