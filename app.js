global.moment = require("moment");

global.express = require("express");
global.app = express();
global.server = require("http").createServer(app);
global.io = require("socket.io")(server);

var mvc = require("./app"),
    port = process.env.PORT || 80,
    listen = server.listen(port);

console.log("Đã khởi động máy chủ tại địa chỉ: http://localhost:" + port + " - Lúc: " + moment().format("hh:mm:ss"));