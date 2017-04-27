var expect = require('chai').expect;
var getItemListMW = require('../../../middleware/items/getItemList');

describe('getItemList middleware', function(){

    it('returns the list of all items', function(done){
        var res = {
            tpl: {}
        };
        var testItemModel = {
            find: function (empty, cb){
                cb(undefined, ['item1', 'item2', 'item3']);
            }
        };

        getItemListMW({
            itemModel: testItemModel
        })({}, res, function (err){
            expect(res.tpl.items).to.eql(['item1', 'item2', 'item3']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('throws exception in case of a database error', function(done){
        var res = {
            tpl: {}
        };
        var testItemModel = {
            find: function (empty, cb){
                cb('database error', undefined);
            }
        };

        getItemListMW({
            itemModel: testItemModel
        })({}, {}, function (err) {
            expect(res.tpl.items).to.eql(undefined);
            expect(err).to.eql('database error');
            done();
        });
    });

});