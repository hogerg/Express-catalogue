var expect = require('chai').expect;
var getCategoryMW = require('../../../middleware/categories/getCategory');

describe('getCategory middleware', function(){

    it('returns the correct category from all categories', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.param = function(){
            return 1;
        }

        var testCategoryModel = {
            findOne: function (empty, cb){
                function findCategory(category){
                    return category._id === 1
                }
                cb(undefined,
                    [{_id:1, name:'cat1'},
                        {_id:2, name:'cat2'},
                        {_id:3, name:'cat3'}
                    ].find(findCategory)
                );
            }
        };

        getCategoryMW({
            categoryModel: testCategoryModel,
        })(req, res, function (err){
            expect(res.tpl.category).to.eql({_id:1, name:'cat1'});
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('redirects if the category is not found', function(done){
        var res = {
            tpl: {}
        };
        res.redirect = function(){
            done();
        }

        var req = {};
        req.param = function(){
            return 4;
        }

        var testCategoryModel = {
            findOne: function (empty, cb){
                function findCategory(category){
                    return category._id === 4
                }
                cb(undefined,
                    [{_id:1, name:'cat1'},
                        {_id:2, name:'cat2'},
                        {_id:3, name:'cat3'}
                    ].find(findCategory)
                );
            }
        };

        getCategoryMW({
            categoryModel: testCategoryModel,
        })(req, res, function (err){

        });
    });

    it('finds category with id provided in res.tpl.item.category variable', function(done){
        var res = {
            tpl: { item: { category: 1 } }
        };

        var testCategoryModel = {
            findOne: function (empty, cb){
                function findCategory(category){
                    return category._id === 1
                }
                cb(undefined,
                    [{_id:1, name:'cat1'},
                        {_id:2, name:'cat2'},
                        {_id:3, name:'cat3'}
                    ].find(findCategory)
                );
            }
        };

        getCategoryMW({
            categoryModel: testCategoryModel,
        })({}, res, function (err){
            expect(res.tpl.category).to.eql({_id:1, name:'cat1'});
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('changes nothing if the provided item has no category', function(done){
        var res = {
            tpl: { item: {} }
        };

        var testCategoryModel = {
            findOne: function (){}
        };

        getCategoryMW({
            categoryModel: testCategoryModel,
        })({}, res, function (err){
            expect(res.tpl.category).to.eql(undefined);
            expect(err).to.eql(undefined);
            done();
        });
    });

});