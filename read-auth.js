fs = require('fs')

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
 
function getAuth(callback) {
    fs.readFile(getUserHome() + '/.emulator_console_auth_token', 'utf8', function (err,data) {
        if (err) {
            if (callback) {
                callback(null);
            }
        }
        if (callback) {
            callback(data);
        }
    });
}

module.exports = getAuth;