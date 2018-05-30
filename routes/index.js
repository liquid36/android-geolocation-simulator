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
    var lat, lng;
    var config = req.body.config;

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
    if (config && config.android === 'true') {
        sender.send(parseFloat(lat),parseFloat(lng));
    } else {
        let headers = {};
        headers[config.key] = config.value;
        let axios = require('axios');
        axios({
            method: 'POST',
            url: config.host,
            data: {
                changos: [
                    {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lng)
                    }
                ]
            },
            headers: headers, 
          }).then((resp) => {
            //   console.log(resp);
          }).catch((err) => {
            //   console.log(err);
          });

    }
    
    res.json({"status" : "ok"});

});

module.exports = router;
