var model = require('../../model');
var FB = require("FB");

module.exports = (function () {
    io.on('connection', function (socket) {
        var sessionID = socket.request.sessionID,
            socketID = socket.id;
        console.log(sessionID + " - " + socketID + ": vừa truy cập");
        socket.emit("user:init", {
            user: model.user.list()
        })
        socket.emit("messenger:init", {
            messengers: model.messenger.list(10)
        })
        
        socket.on('user:login', function (login) {
            if (login.facebook.status !== 'connected') {
                socket.emit("user:updateLoginStatus", {
                    isLogin: false
                });
                return;
            }
            FB.api('me', {
                fields: ['id', 'name'],
                access_token: login.facebook.authResponse.accessToken
            }, function (res) {
                if (!res || res.error) {
                    console.log(!res ? 'Có lỗi xuất hiện' : res.error);
                    // Trả về lỗi đăng nhập
                    return;
                } else {
                    if (model.user.exist("facebookID", res.id)) {
                        model.user.addClientID(sessionID, socketID, res.id);
                        io.emit("user:init", {
                            user: model.user.list()
                        });
                    } else {
                        var newUser = model.user.newUser(res, sessionID, socketID);
                        console.log("Tạo user mới: ", newUser.name, newUser.facebookID);
                        io.emit("user:add", newUser.toClient());
                        model.user.addUser(newUser);
                    }
                    socket.emit("user:updateLoginStatus", {
                        isLogin: true,
                        yourFacebookID: res.id,
                        yourName: res.name
                    });
                }
            });
        });
        socket.on('user:logout', function () {
            model.user.removeClientID(sessionID, socketID);
            io.emit("user:init", {
                user: model.user.list()
            });
            socket.emit("user:updateLoginStatus", {
                isLogin: false
            });
        })
        socket.on('messenger:add', function (data) {
            var newMessenger = model.messenger.newMessenger(data, sessionID);
            if (newMessenger.err === true) {
                return;
                console.log("Có lỗi xảy ra khi tạo đối tượng messenger mới");
            }
            model.messenger.addMessenger(newMessenger);
            console.log(newMessenger.name + ": " + newMessenger.messenger);
            io.emit('messenger:add', newMessenger);
        });
        socket.on('disconnect', function () {
            console.log(sessionID + " - " + socketID + ": vừa ngắt kết nối");
            model.user.removeClientID(sessionID, socketID);
            // console.log(model.user.list());
            io.emit("user:init", {
                user: model.user.list()
            })
        });
    });
})();
