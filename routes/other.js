/**
 * Created by hodanygergo on 2017.03.07..
 */

var renderMW = require('../middleware/generic/render');
var mainRedirectMW = require('../middleware/generic/mainredirect');

module.exports = function(app){

    var objectRepository = {

    };

    /**
     * GET: Login view
     */
    app.get('/login',
        renderMW(objectRepository, 'login')
    );

    /**
     * POST: Login information
     */
    app.post('/login',
        renderMW(objectRepository, 'login')
    );

    /**
     * User logout
     */
    app.use('/logout',
        function (req, res, next) {
            return res.redirect('/items');
        }
    );

    /**
     * GET: Register view
     */
    app.get('/register',
        renderMW(objectRepository, 'register')
    );

    /**
     * POST: Register information
     */
    app.post('/register',
        renderMW(objectRepository, 'register')
    );

    /**
     * GET: Website description
     */
    app.get('/about',
        renderMW(objectRepository, 'info')
    );

    /**
     * GET: Contact information
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