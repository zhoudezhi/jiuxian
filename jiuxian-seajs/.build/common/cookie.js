// JavaScript Document
/* 
* cookie  创建和存储 cookie
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
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
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };
    cookie.setCookie = function(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
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
    module.exports = cookie;
});