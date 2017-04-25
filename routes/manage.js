var renderMW = require('../middleware/generic/render');

var getItemListMW = require('../middleware/items/getItemList');
var getItemMW = require('../middleware/items/getItem');

var getCategoryListMW = require('../middleware/categories/getCategoryList');
var getCategoryMW = require('../middleware/categories/getCategory');

var updateItemMW = require('../middleware/items/updateItem');
var updateCategoryMW = require('../middleware/categories/updateCategory');

var deleteItemMW = require('../middleware/items/deleteItem');
var deleteCategoryMW = require('../middleware/categories/deleteCategory');

var authMW = require('../middleware/generic/authenticate');
var getSessionIdMW = require('../middleware/generic/getSessionId');

var itemModel = require('../models/item');
var categoryModel = require('../models/category');

module.exports = function(app){

    var objectRepository = {
        itemModel: itemModel,
        categoryModel: categoryModel
    };

    /**
     * GET: Manage view
     */
    app.get('/manage',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        getItemListMW(objectRepository),
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock_manage')
    );

    /**
     * GET: Manage item view
     */
    app.get('/items/new',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * POST: New item data
     */
    app.post('/items/new',
        authMW(objectRepository),
        updateItemMW(objectRepository),
        function (req, res, next) {
            if (res.tpl.error.length == 0){
                res.redirect('/manage');
            }
            else return next();
        },
        getSessionIdMW(objectRepository),
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * GET: Modify item view
     */
    app.get('/items/:id/edit',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        getItemMW(objectRepository),
        getCategoryListMW(objectRepository),
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * POST: Modified item data
     */
    app.post('/items/:id/edit',
        authMW(objectRepository),
        getItemMW(objectRepository),
        updateItemMW(objectRepository),
        function (req, res, next) {
            if (res.tpl.error.length == 0){
                res.redirect('/manage');
            }
            else return next();
        },
        getSessionIdMW(objectRepository),
        getCategoryListMW(objectRepository),
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * Delete referenced item
     */
    app.use('/items/:id/delete',
        authMW(objectRepository),
        getItemMW(objectRepository),
        deleteItemMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

    /**
     * GET: Manage category view
     */
    app.get('/categories/new',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * POST: New category data
     */
    app.post('/categories/new',
        authMW(objectRepository),
        updateCategoryMW(objectRepository),
        function (req, res, next) {
            if (res.tpl.error.length == 0){
                res.redirect('/manage');
            }
            else return next();
        },
        getSessionIdMW(objectRepository),
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * GET: Modify category view
     */
    app.get('/categories/:id/edit',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * POST: Modified category data
     */
    app.post('/categories/:id/edit',
        authMW(objectRepository),
        getCategoryMW(objectRepository),
        updateCategoryMW(objectRepository),
        function (req, res, next) {
            if (res.tpl.error.length == 0){
                res.redirect('/manage');
            }
            else return next();
        },
        getSessionIdMW(objectRepository),
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * Delete referenced category
     */
    app.use('/categories/:id/delete',
        authMW(objectRepository),
        getSessionIdMW(objectRepository),
        getCategoryMW(objectRepository),
        deleteCategoryMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

};