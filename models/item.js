/**
 * Created by Gergo on 2017. 04. 19..
 */

var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Item = db.model('Item', {
    name: String,
    price: Number,
    category: Schema.Types.ObjectId,
    description: String
});

module.exports = Item;