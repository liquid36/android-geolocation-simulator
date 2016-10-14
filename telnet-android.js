var connect = require('net');

function AdbSendGeoFix () {
    var self  = this;
    var fs = require('fs');
    var config;

    try {
        var txt = fs.readFileSync('config.json', 'utf8'); 
        config = JSON.parse(txt);
    } catch (e) { 
        config = {};
    } 

    console.log(config);    

    self.auth = config.auth || "8iBmnkSx1Lt4shhV";

    self.host = config.host || "localhost";

    self.port = config.port || 5554;

    self.onEnd = undefined ; 

    self.send  =  function (lat,lng) {
        console.log("Sending geo fix to " + self.host + ":" + self.port);
        var fase = 0;
        var client = connect.connect(self.port, self.host);
        try {
            client.on('data', function(data) {
                //console.log('Data is: ' + data); 
                if (fase == 0) { 
                    client.write("auth " + self.auth +  " \n");
                    fase = 1;
                } else if (fase == 1) {
                    var isNotMac = !(/^darwin/.test(process.platform));

                    var s_lat = ('' + lat);
                    var s_lng = ('' + lng); 
                    if(isNotMac) {
                        s_lat = s_lat.replace(".",",");
                        s_lng = s_lng.replace(".",","); 
                    }
                    var cmd = "geo fix " + s_lng + " " +  s_lat + "\n"; 
                    console.log("Executing: " + cmd); 
                    client.write(cmd);
                    fase = 2;
                } else if (fase == 2) {
                    fase = 3;  
                    client.write("exit\n");
                }
                
            }).on('connect', function() {
                console.log("Connected success");
            }).on('end', function() { 
                console.log("Connected ended");
            }).on('error', function(a) { 
                console.log("Connected error: ", a);
            });
        } catch (ex) {
            console.log("Exception catched: " + ex);
        }

    }

}

var runningAsScript = !module.parent;
if (runningAsScript) {
    var m = new AdbSendGeoFix();
    m.send(-32.956942,-60.636598);
} else {
    module.exports = new AdbSendGeoFix();
}
