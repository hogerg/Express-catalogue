var expect = require('chai').expect;
var getSessionIdMW = require('../../../middleware/generic/getSessionId');

describe('getSessionId middleware', function(){

    it('places session data on the template if the user is logged in', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.session = { userid: 'sid1', email: 'email1' };

        getSessionIdMW({
            itemModel: {}
        })(req, res, function (err){
            expect(res.tpl.session).to.eql({sid: 'sid1', email: 'email1'});
            done();
        });
    });

    it('does nothing if the user is not logged in', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.session = {};

        getSessionIdMW({
            itemModel: {}
        })(req, res, function (err){
            expect(res.tpl.session).to.eql(undefined);
            done();
        });
    });

});