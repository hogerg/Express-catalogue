/**
 * Created by Gergo on 2017. 04. 19..
 */

var Schema = require('mongoose').Schema;
var db = require('../config/db');

var CategorySchema = new Schema({
    name: String
});

CategorySchema.pre('remove', function(next){
   this.model('Item').update(
       { "category": this._id },
       { "$unset": { "category": 1 } },
       { "multi": true },
       next
   );
});

var Category = db.model('Category', CategorySchema);

module.exports = Category;