var expect = require('chai').expect;
var getItemMW = require('../../../middleware/items/getItem');

describe('getItem middleware', function(){

    it('returns the correct item from all items', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.param = function(){
            return 1;
        }

        var testItemModel = {
            findOne: function (empty, cb){
                function findItem(item){
                    return item._id === 1
                }
                cb(undefined,
                    [{_id:1, name:'item1'},
                        {_id:2, name:'item2'},
                        {_id:3, name:'item3'}
                    ].find(findItem)
                );
            }
        };

        getItemMW({
            itemModel: testItemModel,
        })(req, res, function (err){
            expect(res.tpl.item).to.eql({_id:1, name:'item1'});
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('redirects if the item is not found', function(done){
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

        var testItemModel = {
            findOne: function (empty, cb){
                function findItem(item){
                    return item._id === 4
                }
                cb(undefined,
                    [{_id:1, name:'item1'},
                        {_id:2, name:'item2'},
                        {_id:3, name:'item3'}
                    ].find(findItem)
                );
            }
        };

        getItemMW({
            itemModel: testItemModel,
        })(req, res, function (err){

        });
    });

});