var expect = require('chai').expect;
var deleteCategoryMW = require('../../../middleware/categories/deleteCategory');

describe('deleteCategory middleware', function(){

    it('removes the category object provided on the template', function(done){
        var category = {
            remove: function(){
                done();
            }
        }
        var res = {
            tpl: { category: category }
        };

        deleteCategoryMW({
            categoryModel: {}
        })({}, res, function (err){

        });
    });

    it('does nothing if there is no category on the template', function(done){
        var res = {
            tpl: {}
        };

        deleteCategoryMW({
            categoryModel: {}
        })({}, res, function (err) {
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('throws exception in case of a database error', function(done){
        var category = {
            remove: function(cb){
                cb('database error');
            }
        }

        var res = {
            tpl: { category: category }
        };

        deleteCategoryMW({
            categoryModel: {}
        })({}, res, function (err) {
            expect(err).to.eql('database error');
            done();
        });
    });

});