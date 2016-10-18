var express = require('express');
var path = require('path');

var router = express.Router();

var date = new Date();

/* GET home page. */

var sender = require('../telnet-android');

router.get('/', function(req, res, next) {
    res.sendfile('map.html', { root: path.join(__dirname, '../public') } );
}); 

router.all('/send', function (req, res, next){
    var lat,lng;
    if (req.body.lat && req.body.lng) {
        lat = req.body.lat;
        lng = req.body.lng;
    } else if (req.param('lat') && req.param('lng') ) {
        lat = req.param('lat');
        lng = req.param('lng');
    } else{
        res.json({"status": "error"});
        return;
    }

    sender.send(parseFloat(lat),parseFloat(lng));
    
    res.json({"status" : "ok"});

});

module.exports = router;
