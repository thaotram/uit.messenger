var db = require("../../../database");

module.exports = (function () {
    var messenger = function (obj, sessionID) {
        var thisUser = db.userDB.getUser(sessionID);
        if (thisUser == null) {
            console.log("Không tìm thấy thông tin người gửi trong csdl: ", sessionID);
            this.err = true;    
        } else {
            this.groupID = db.messengerDB.getGroupID(thisUser.facebookID);
            this.facebookID = thisUser.facebookID;
            this.name = thisUser.name;
            this.messenger = obj.messenger;
            this.color = thisUser.color;
            this.time = moment().format("x");
        }
    }
    messenger.prototype.toClient = function () {
        return {
            "groupID": this.groupID,
            "facebookID": this.facebookID,
            "name": this.name,
            "messenger": this.messenger,
            "color": this.color,
            "time": this.time
        }
    }
    return {
        list: db.messengerDB.list,
        newMessenger: function (obj, sessionID) {
            return new messenger(obj, sessionID);
        },
        addMessenger: db.messengerDB.addMessenger
    }
})();