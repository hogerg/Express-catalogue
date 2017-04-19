var renderMW = require('../middleware/generic/render');

var getItemListMW = require('../middleware/items/getItemList');
var getItemMW = require('../middleware/items/getItem');

var getCategoryListMW = require('../middleware/categories/getCategoryList');
var getCategoryMW = require('../middleware/categories/getCategory');

var updateItemMW = require('../middleware/items/updateItem');
var updateCategoryMW = require('../middleware/categories/updateCategory');

var deleteItemMW = require('../middleware/items/deleteItem');
var deleteCategoryMW = require('../middleware/categories/deleteCategory');

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
        getItemListMW(objectRepository),
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock_manage')
    );

    /**
     * GET: Manage item view
     */
    app.get('/items/new',
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * POST: New item data
     */
    app.post('/items/new',
        updateItemMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

    /**
     * GET: Modify item view
     */
    app.get('/items/:id/edit',
        getItemMW(objectRepository),
        getCategoryListMW(objectRepository),
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'stock_newitem')
    );

    /**
     * POST: Modified item data
     */
    app.post('/items/:id/edit',
        getItemMW(objectRepository),
        updateItemMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

    /**
     * Delete referenced item
     */
    app.use('/items/:id/delete',
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
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * POST: New category data
     */
    app.post('/categories/new',
        updateCategoryMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

    /**
     * GET: Modify category view
     */
    app.get('/categories/:id/edit',
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'stock_newcategory')
    );

    /**
     * POST: Modified category data
     */
    app.post('/categories/:id/edit',
        getCategoryMW(objectRepository),
        updateCategoryMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

    /**
     * Delete referenced category
     */
    app.use('/categories/:id/delete',
        getCategoryMW(objectRepository),
        deleteCategoryMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/manage');
        }
    );

};