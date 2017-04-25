var requireOption = require('../common').requireOption;

/**
 * Get category with provided id
 *  - Redirect to /manage if there is no such category
 *  - Place category on category template field otherwise
 */

module.exports = function (objectrepository) {

    var categoryModel = requireOption(objectrepository, 'categoryModel');

    return function (req, res, next) {

        if(typeof res.tpl.item === 'undefined'){
            categoryModel.findOne({
                _id: req.param('id')
            }, function (err, result) {
                if ((err) || (!result)) {
                    return res.redirect('/manage');
                }

                res.tpl.category = result;
                return next();
            });
        }
        else if(res.tpl.item.category != null){
            categoryModel.findOne({
                _id: res.tpl.item.category
            }, function (err, result) {
                if ((err) || (!result)) {
                    return res.redirect('/manage');
                }

                res.tpl.category = result;
                return next();
            });
        }
        else return next();

    };

};