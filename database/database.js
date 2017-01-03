var loki = require("lokijs");
var db = new loki('loki.json');
var userDB = db.addCollection('user');
var messengerDB = db.addCollection("messenger");

module.exports.userDB = {
    list: (toWhere) => {
        if (toWhere == "toClient" || !toWhere) {
            return userDB.data.filter((data) => {
                return data.connectionID.length > 0
            }).map((data) => {
                return {
                    "facebookID": data.facebookID,
                    "name": data.name,
                    "status": data.status,
                    "color": data.color,
                }
            });
        } else if (toWhere == "toDatabase") {
            return userDB.data;
        }
    },
    exist: (property, value) => {
        if (property === "facebookID") {
            return userDB.find({
                "facebookID": value
            }).length > 0;
        } else if (property === "sessionID") {
            return userDB.data.filter((data) => {
                return data.connectionID.filter((connections) => {
                    return connections[0] === value;
                }).length > 0;
            }).length > 0;
        } else if (property === "socketID") {
            return userDB.data.filter((data) => {
                return data.connectionID.filter((connections) => {
                    return connections[1] === socketID;
                }).length > 0;
            }).length > 0;
        } else {
            console.log("Không tìm thấy property: " + property);
            return undefined;
        }
    },
    addClientID: (sessionID, socketID, facebookID) => {
        userDB.findAndUpdate((data) => {
            return data.facebookID == facebookID;
        }, (data) => {
            data.connectionID.push([sessionID, socketID]);
            return data;
        });
    },
    removeClientID: (sessionID, socketID) => {
        userDB.findAndUpdate((data) => {
            return data.connectionID.filter((value) => {
                return value[0] == sessionID && value[1] == socketID;
            }).length > 0;
        }, (data) => {
            data.connectionID.forEach((value, index) => {
                if (value[0] == sessionID && value[1] == socketID) {
                    data.connectionID.splice(index, 1);
                }
            })
            return data;
        })
    },
    getUser: (sessionID) => {
        try {
            return userDB.chain().find().where((obj)=>{
                return obj.connectionID.filter((connectionID)=>{
                    return connectionID[0] == sessionID;
                }).length > 0
            }).data()[0];
        } catch(e){
            console.log(e);
            return null;
        }
    },
    addUser: (userObj) => {
        userDB.insert(userObj);
    }
};
module.exports.messengerDB = {
    getGroupID: (facebookID) => {
        if (messengerDB.data.length == 0) {
            return 0;
        }
        var lastMessenger = messengerDB.chain().find().data()[messengerDB.data.length - 1];
        if (lastMessenger.facebookID == facebookID) {
            return lastMessenger.groupID;
        } else {
            return lastMessenger.groupID + 1;
        }
    },
    list: (number) => {
        return messengerDB.chain().find().simplesort("time").limit(number).data();
    },
    addMessenger: (messengerObj) => {
        messengerDB.insert(messengerObj);
    },
}