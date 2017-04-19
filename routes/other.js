/**
 * Created by hodanygergo on 2017.03.07..
 */

var renderMW = require('../middleware/generic/render');
var mainRedirectMW = require('../middleware/generic/mainredirect');

module.exports = function(app){

    var objectRepository = {

    };

    /**
     * Website description
     */
    app.get('/about',
        renderMW(objectRepository, 'info')
    );

    /**
     * Contact information
     */
    app.get('/contact',
        renderMW(objectRepository, 'contact')
    );

    /**
     * Root
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

};