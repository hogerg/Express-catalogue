var expect = require('chai').expect;
var updateCategoryMW = require('../../../middleware/categories/updateCategory');

describe('updateCategory middleware', function(){

    it('saves provided category data', function(done){
        var category = {_id:1, name:'cat1'};
        category.save = function (cb){
            cb(undefined, undefined);
        }

        var res = {
            tpl: { category: category }
        };

        var req = {};
        req.body = { name: "cat2" }

        updateCategoryMW({
            categoryModel: {}
        })(req, res, function (err){
            expect(res.tpl.category.name).to.eql('cat2');
            done();
        });
    });

    it('changes nothing if category name is not provided', function(done){
        var res = {
            tpl: { error: [] }
        };

        var req = {};
        req.body = { name: '' }

        updateCategoryMW({
            categoryModel: {}
        })(req, res, function (err){
            expect(res.tpl.error[0]).to.eql('Name required');
            done();
        });
    });

});