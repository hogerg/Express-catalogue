/**
 * Created by hodanygergo on 2017.02.21..
 */

var renderMW = require('../middleware/generic/render');
var mainRedirectMW = require('../middleware/generic/mainredirect');

module.exports = function(app){

    var objectRepository = {

    };

    /**
     * Item list
     */
    app.get('/items',
        renderMW(objectRepository, 'stock')
    );

    

};