// JavaScript Document
/* 
 * Name：cookie  创建和存储 cookie
 * Date: 2017-05-20
 */
define(function () {

    var cookie = {};
    cookie.getCookie = function (name) {
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

    cookie.setCookie = function (name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + encodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
    };

    cookie.checkCookie = function () {
        var username = cookie.getCookie('username');
        if (username != null && username != "") {
            alert('Welcome again ' + username + '!');
        } else {
            username = prompt('Please enter your name:', "");
            if (username != null && username != "") {
                cookie.setCookie('username', username, 365);
            }
        }
    };

    //删除cookie
    cookie.deleteCookie = function (name) {
        /*var exdate = new Date();
         exdate.setDate(exdate.getDate() - 1);
         var value = cookie.getCookie(name);
         if (value != null) document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toUTCString();*/
        cookie.setCookie(name, '', -1);
    };

   return cookie
});


