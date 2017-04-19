/**
 * Created by hodanygergo on 2017.02.21..
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Initialize template and error template field on response
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

require('./routes/item')(app);
require('./routes/manage')(app);
require('./routes/other')(app);

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Error!');
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    console.log('Running on :3000');
});