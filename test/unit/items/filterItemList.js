var expect = require('chai').expect;
var filterItemListMW = require('../../../middleware/items/filterItemList');

describe('filterItemList middleware', function(){

    it('returns the list of all items filtered by name and category', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.body = { keyword: 'AB', category: 'cat1'};
        req.param = function(p){
            if(p === 'keyword'){
                return req.body.keyword;
            }
            else return req.body.category;
        }

        var items = [
            {name: 'ABC', category: 'cat2'},
            {name: 'ABC', category: 'cat1'},
            {name: 'CBA', category: 'cat2'}
        ];

        var testItemModel = {
            find: function (empty, cb){
                cb(undefined, [ items[1] ]);
            }
        };

        filterItemListMW({
            itemModel: testItemModel
        })(req, res, function (err){
            expect(res.tpl.items).to.eql([{name: 'ABC', category: 'cat1'}]);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('returns the list of all items filtered by name if category is not provided', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.body = { keyword: 'AB', category: '0'};
        req.param = function(p){
            if(p === 'keyword'){
                return req.body.keyword;
            }
            else return req.body.category;
        }

        var items = [
            {name: 'ABC', category: 'cat2'},
            {name: 'ABC', category: 'cat1'},
            {name: 'CBA', category: 'cat2'}
        ];

        var testItemModel = {
            find: function (empty, cb){
                cb(undefined, [ items[0], items[1] ]);
            }
        };

        filterItemListMW({
            itemModel: testItemModel
        })(req, res, function (err){
            expect(res.tpl.items).to.eql([{name: 'ABC', category: 'cat2'}, {name:'ABC', category: 'cat1'}]);
            expect(err).to.eql(undefined);
            done();
        });
    });

});