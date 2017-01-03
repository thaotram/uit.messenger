var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var ejs = require("ejs");
var session = require("express-session");

module.exports = (function () {
    var sessionConfig = session({
        name: "mvc.app.sid",
        secret: 'Mã bảo mật session ở máy chủ',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        }
    })
    io.use(function (socket, next) {
        sessionConfig(socket.request, socket.request.res, next);
    });
    app.use(sessionConfig);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use('/', express.static('client-bundle'));
    app.set('views', 'app/views');
    app.set('view engine', 'ejs');
})();