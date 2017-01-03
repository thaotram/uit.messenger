var randomColor = require("randomcolor");
var db = require("../../../database");

module.exports = (function () {
    var user = function (obj, sessionID, socketID) {
        this.connectionID = [
            [sessionID, socketID]
        ];
        this.facebookID = obj.facebookID || obj.id;
        this.name = obj.name;
        this.status = obj.status || "online";
        this.color = randomColor({
            luminosity: "dark"
        });
    }
    user.prototype.toClient = function () {
        return {
            "facebookID": this.facebookID,
            "name": this.name,
            "status": this.status,
            "color": this.color,
        }
    }
    return {
        newUser: function (obj, sessionID, socketID) {
            return new user(obj, sessionID, socketID)
        },
        list: db.userDB.list,
        exist: db.userDB.exist,
        addClientID: db.userDB.addClientID,
        addUser: db.userDB.addUser,
        removeClientID: db.userDB.removeClientID
    }
})();