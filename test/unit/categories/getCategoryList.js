var expect = require('chai').expect;
var getCategoryListMW = require('../../../middleware/categories/getCategoryList');

describe('getCategoryList middleware', function(){

    it('returns the list of all categories', function(done){
        var res = {
            tpl: {}
        };
        var testCategoryModel = {
            find: function (empty, cb){
                cb(undefined, ['cat1', 'cat2', 'cat3']);
            }
        };

        getCategoryListMW({
            categoryModel: testCategoryModel
        })({}, res, function (err){
            expect(res.tpl.categories).to.eql(['cat1', 'cat2', 'cat3']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('throws exception in case of a database error', function(done){
        var res = {
            tpl: {}
        };
        var testCategoryModel = {
            find: function (empty, cb){
                cb('database error', undefined);
            }
        };

        getCategoryListMW({
            categoryModel: testCategoryModel
        })({}, {}, function (err) {
            expect(res.tpl.categories).to.eql(undefined);
            expect(err).to.eql('database error');
            done();
        });
    });

});