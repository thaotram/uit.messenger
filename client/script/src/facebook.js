import { socket } from "./socket.js"

export var facebook = (function () {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '787086184776326',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
        // FB.login();
        FB.getLoginStatus(function (res) {
            if (res.status === "connected") {
                console.log("FB Client: Người dùng đã đăng nhập");
                console.log("FB Client: ", res);
                socket.emit('user:login', {
                    "facebook": res
                });
            } else {
                console.log("FB Client: Người dùng chưa đăng nhập");
                socket.emit('user:login', {
                    "facebook": {
                        status: "unknown"
                    }
                });
            }
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
    return {
        login: function () {
            FB.login(function (res) {
                if (res.status === 'connected') {
                    socket.emit('user:login', {
                        "facebook": res
                    });
                }
            })
        },
        logout: function () {
            FB.logout(function (res) {
                console.log(res);
                socket.emit('user:logout', {
                    "mess": "Người dùng đã đăng xuất"
                });
            })
        }
    }
})();