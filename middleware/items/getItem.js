var requireOption = require('../common').requireOption;

/**
 * Get item with provided id
 *  - Redirect to /items if there is no such item
 *  - Place item on item template field otherwise
 */

module.exports = function (objectrepository) {

    var itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {

        itemModel.findOne({
            _id: req.param('id')
        }, function (err, result) {
            if ((err) || (!result)) {
                return req.redirect('/items');
            }

            res.tpl.item = result;
            return next();
        });
    };

};