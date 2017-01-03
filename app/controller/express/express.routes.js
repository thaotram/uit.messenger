var bundle    = "browserify client/script/main.js -o client-bundle/script/js.js -t [ babelify --presets [ es2015 react ] ]",
    bundle_min = "browserify client/script/js.js -o client-bundle/script/js.min.js -t [ uglifyify --no-sourcemap ]";
var exec = require('child_process').exec;

module.exports["/"] = function (req, res) {
    res.render('index');
};

module.exports["/info"] = function (req, res) {
    res.render('info');
};

module.exports["/report"] = function (req, res) {
    res.render('report');
};

module.exports["/js"] = function (req, res) {
    exec(bundle, function (error, stdout, stderr) {
        if (error) {
            console.error(`${moment().format("hh:mm:ss")}: Lỗi khi tạo file: ${error}`);
        } else {
            console.log(moment().format("hh:mm:ss") + ": Đã tạo file chưa nén thành công.");
        }
        res.render('index');
    });
};

module.exports["/min-js"] = function (req, res) {
    exec(bundle, function (error, stdout, stderr) {
        if (error) {
            console.error(`${moment().format("hh:mm:ss")}: Lỗi khi tạo file: ${error}`);
        } else {
            console.log(moment().format("hh:mm:ss") + ": Đã tạo file chưa nén thành công.");
            exec(bundle_min, function (error, stdout, stderr) {
                res.render('index');
            });
        }
        res.render('index.min');
    });
};