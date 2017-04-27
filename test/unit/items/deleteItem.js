var expect = require('chai').expect;
var deleteItemMW = require('../../../middleware/items/deleteItem');

describe('deleteItem middleware', function(){

    it('removes the item object provided on the template', function(done){
        var item = {
            remove: function(){
                done();
            }
        }
        var res = {
            tpl: { item: item }
        };

        deleteItemMW({
            itemModel: {}
        })({}, res, function (err){

        });
    });

    it('does nothing if there is no item on the template', function(done){
        var res = {
            tpl: {}
        };

        deleteItemMW({
            itemModel: {}
        })({}, res, function (err) {
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('throws exception in case of a database error', function(done){
        var item = {
            remove: function(cb){
                cb('database error');
            }
        }

        var res = {
            tpl: { item: item }
        };

        deleteItemMW({
            itemModel: {}
        })({}, res, function (err) {
            expect(err).to.eql('database error');
            done();
        });
    });

});