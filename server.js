/**
 * Created by hodanygergo on 2017.02.21..
 */

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('static'));

/**
 * A template es error tarolok letrehozasa a response-on
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

require('./routes/item')(app);
require('./routes/other')(app);

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Hiba tortent!');
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    console.log('Running on :3000');
});