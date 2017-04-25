/**
 * Created by hodanygergo on 2017.03.07..
 */

var renderMW = require('../middleware/generic/render');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var mainRedirectMW = require('../middleware/generic/mainredirect');
var logoutMW = require('../middleware/generic/logout');
var inverseAuthMW = require('../middleware/generic/inverseAuthenticate');
var getSessionIdMW = require('../middleware/generic/getSessionId');

var userModel = require('../models/user');

module.exports = function(app){

    var objectRepository = {
        userModel: userModel
    };

    /**
     * GET: Login view
     */
    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * POST: Login information
     */
    app.post('/login',
        checkUserLoginMW(objectRepository),
        function (req, res, next) {
            if(res.tpl.error.length == 0){
                return res.redirect('/items');
            }
            else return next();
        },
        renderMW(objectRepository, 'login')
    );

    /**
     * User logout
     */
    app.use('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/login');
        }
    );

    /**
     * GET: Register view
     */
    app.get('/register',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /**
     * POST: Register information
     */
    app.post('/register',
        checkUserRegistrationMW(objectRepository),
        function (req, res, next) {
            if(res.tpl.error.length == 0){
                return res.redirect('/login');
            }
            else return next();
        },
        renderMW(objectRepository, 'register')
    );

    /**
     * GET: Website description
     */
    app.get('/about',
        getSessionIdMW(objectRepository),
        renderMW(objectRepository, 'info')
    );

    /**
     * GET: Contact information
     */
    app.get('/contact',
        getSessionIdMW(objectRepository),
        renderMW(objectRepository, 'contact')
    );

    /**
     * Root
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

};