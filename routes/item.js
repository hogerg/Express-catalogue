/**
 * Created by hodanygergo on 2017.02.21..
 */

var renderMW = require('../middleware/generic/render');

var getItemListMW = require('../middleware/items/getItemList');
var getItemMW = require('../middleware/items/getItem');

var getCategoryListMW = require('../middleware/categories/getCategoryList');
var getCategoryMW = require('../middleware/categories/getCategory');

var filterItemListMW = require('../middleware/items/filterItemList');

var getSessionIdMW = require('../middleware/generic/getSessionId');

var itemModel = require('../models/item');
var categoryModel = require('../models/category');

module.exports = function(app){

    var objectRepository = {
        itemModel: itemModel,
        categoryModel: categoryModel
    };

    /**
     * GET: Item list
     */
    app.get('/items',
        getSessionIdMW(objectRepository),
        getItemListMW(objectRepository),
        getCategoryListMW(objectRepository),
        renderMW(objectRepository, 'stock')
    );

    /**
     * POST: Filter items
     */
    app.post('/items',
        getSessionIdMW(objectRepository),
        getItemListMW(objectRepository),
        getCategoryListMW(objectRepository),
        filterItemListMW(objectRepository),
        renderMW(objectRepository, 'stock')
    );

    /**
     * GET: Details of the item with the provided id
     */
    app.get('/items/:id/details',
        getSessionIdMW(objectRepository),
        getItemMW(objectRepository),
        getCategoryMW(objectRepository),
        renderMW(objectRepository, 'details')
    );

};