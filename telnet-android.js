var connect = require('net');
var fs = require('fs');
var path = require('path');

function AdbSendGeoFix () {
    var self  = this;
    var auth = undefined; 

    function getUserHome() {
        return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    }

    console.log(getUserHome());

    var argv = require('minimist')(process.argv.slice(2));
    try {  
        auth = '' + fs.readFileSync(path.join(getUserHome(),".emulator_console_auth_token"));
        console.log("Auth token found: " + auth);
    } catch (e) {  
        console.log("No Auth token found");
    }      

    self.auth = argv.auth || auth;

    self.host = argv.host || "localhost";

    self.port = argv.port || 5554;

    self.onEnd = undefined ; 

    console.log("Android emulator config: Host: " + self.host + ":" + self.port + " Auth: " + self.auth);

    self.send  =  function (lat,lng) {
        //console.log("Sending geo fix to " + self.host + ":" + self.port + " Auth: " + self.auth);
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
