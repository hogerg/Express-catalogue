var expect = require('chai').expect;
var authenticateMW = require('../../../middleware/generic/authenticate');

describe('authenticate middleware', function(){

    it('places session identifier on the template if the user is logged in', function(done){
        var res = {
            tpl: {}
        };

        var req = {};
        req.session = { userid: 'sid1' };

        authenticateMW({
            itemModel: {}
        })(req, res, function (err){
            expect(res.tpl.sid).to.eql('sid1');
            done();
        });
    });

    it('redirects if the user is not logged in', function(done){
        var res = {
            tpl: {}
        };
        res.redirect = function(){
            done();
        }

        var req = {};
        req.session = {};

        authenticateMW({
            itemModel: {}
        })(req, res, function (err){

        });
    });

});