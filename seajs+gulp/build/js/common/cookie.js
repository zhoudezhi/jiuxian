define("../js/common/cookie", [], function(require, exports, module) {
    var cookie = {};
    cookie.getCookie = function(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return decodeURI(document.cookie.substring(start, end));
            }
        }
        return "";
    };
    cookie.setCookie = function(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + encodeURI(value) + (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
    };
    cookie.checkCookie = function() {
        var username = cookie.getCookie("username");
        if (username != null && username != "") {
            alert("Welcome again " + username + "!");
        } else {
            username = prompt("Please enter your name:", "");
            if (username != null && username != "") {
                cookie.setCookie("username", username, 365);
            }
        }
    };
    cookie.deleteCookie = function(name) {
        cookie.setCookie(name, "", -1);
    };
    module.exports = cookie;
});