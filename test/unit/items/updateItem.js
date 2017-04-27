var expect = require('chai').expect;
var updateItemMW = require('../../../middleware/items/updateItem');

describe('updateItem middleware', function(){

    it('saves provided item data', function(done){
        var item = {_id:1, name:'item1', price: 0, category: 0};
        item.save = function (cb){
            cb(undefined, undefined);
        }

        var res = {
            tpl: { item: item }
        };

        var req = {};
        req.body = { name: 'item2', price: 1000, category: 123 };

        updateItemMW({
            itemModel: {}
        })(req, res, function (err){
            expect(res.tpl.item.name).to.eql('item2');
            expect(res.tpl.item.price).to.eql(1000);
            expect(res.tpl.item.category).to.eql(123);
            done();
        });
    });

    it('pushes errors if there are missing parameters', function(done){
        var item = {_id:1, name:'item1', price: 0, category: 0};
        item.save = function (cb){
            cb(undefined, undefined);
        }

        var res = {
            tpl: { item: item, error: [] }
        };

        var req = {};
        req.body = { name: '', price: '', category: ''};

        updateItemMW({
            itemModel: {}
        })(req, res, function (err){
            expect(res.tpl.item.name).to.eql('item1');
            expect(res.tpl.item.price).to.eql(0);
            expect(res.tpl.item.category).to.eql(0);
            expect(res.tpl.error[0]).to.eql('Name required');
            expect(res.tpl.error[1]).to.eql('Price required');
            expect(res.tpl.error[2]).to.eql('Category required');
            done();
        });
    });

});