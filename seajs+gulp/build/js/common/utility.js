define("../js/common/utility", [], function(require, exports, module) {
    var utility = {};
    utility.currentUrl = location.protocol + "//" + location.host + location.pathname;
    utility.isMobile = function(str) {
        return /^0?1(3|4|5|7|8)\d{9}$/.test((str || "").toString().trim());
    };
    utility.getUserAgent = function() {
        var ua = navigator.userAgent || "";
        return ua.toLowerCase();
    };
    utility.parseInt_10 = function(a) {
        return parseInt(a, 10);
    };
    utility.parseFloat_10 = function(a) {
        return parseFloat(a, 10);
    };
    utility.JSONparse = function(str) {
        if (typeof str !== "string") {
            return "";
        }
        try {
            return JSON.parse(str);
        } catch (e) {
            return "";
        }
    };
    utility.getTime = function() {
        return new Date().getTime();
    };
    utility.random = function(from, to) {
        return from + Math.floor(to * Math.random());
    };
    utility.parseQueryString = function() {
        var reslut = {};
        var str = location.search.substring(1);
        var temp = str.split("&");
        var length = temp.length;
        for (var i = 0; i < length; i++) {
            var key = temp[i].split("=");
            reslut[key[0]] = key[1];
        }
        return reslut;
    };
    utility.checkRegEmoji = function(str) {
        return /^[^\uD800-\uDBFF]+$/.test((str || "").toString().trim());
    };
    utility.houMinSec = function(time) {
        var hh = parseInt(time / (60 * 60));
        var ss = parseInt(time % 60);
        var mm = parseInt((time - hh * 60 * 60) / 60);
        var result = {
            hh: checkTime(hh),
            mm: checkTime(mm),
            ss: checkTime(ss)
        };
        return result;
    };
    function checkTime(i) {
        var i = utility.parseInt_10(i);
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    utility.createCode = function() {
        var code = "";
        var codeLength = 6;
        var selectChar = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += selectChar[charIndex];
        }
        return code;
    };
    var sessionStorageEnabled = false;
    try {
        sessionStorage.setItem("1", "1");
        sessionStorageEnabled = true;
    } catch (e) {}
    var sessionstore = {
        data: {},
        getItem: function(key) {
            if (sessionStorageEnabled) {
                return utility.JSONparse(sessionStorage.getItem(key));
            } else {
                return sessionstore.data[key];
            }
        },
        setItem: function(key, value) {
            if (sessionStorageEnabled) {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                sessionstore.data[key] = value;
            }
        },
        removeItem: function(key) {
            if (sessionStorageEnabled) {
                sessionStorage.removeItem(key);
            } else {
                delete sessionstore.data[key];
            }
        }
    };
    utility.sessionstate = sessionstore;
    utility.isJDApp = function() {
        var ua = utility.getUserAgent();
        var agentData = ua.split(";");
        var result = agentData[0].toLowerCase() == "jdapp";
        return result;
    };
    utility.isJDios = function() {
        var ua = utility.getUserAgent();
        var agentData = ua.split(";");
        var result = "";
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "iphone";
        }
        return result;
    };
    utility.isJDandroid = function() {
        var ua = utility.getUserAgent();
        var agentData = ua.split(";");
        var result = "";
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "android";
        }
        return result;
    };
    function isSupportSticky() {
        var prefixTestList = [ "", "-webkit-", "-ms-", "-moz-", "-o-" ];
        var stickyText = "";
        for (var i = 0; i < prefixTestList.length; i++) {
            stickyText += "position:" + prefixTestList[i] + "sticky;";
        }
        var div = document.createElement("div");
        var body = document.body;
        div.style.cssText = "display:none;" + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    }
    utility.stickyDom = function(obj) {
        var stickyTime;
        if (!obj) {
            return false;
        }
        var normalDom = obj.normalDom.get(0);
        var fixedDom = obj.fixedDom.get(0);
        var fixedTop = obj.fixedTop || 0;
        if (!obj.normalDom || !obj.fixedDom || normalDom.length == 0 || fixedDom.length == 0) {
            return false;
        }
        if (isSupportSticky()) {
            normalDom.className = normalDom.className + " sticky";
        } else {
            clearInterval(stickyTime);
            stickyTime = setInterval(function() {
                var rect = normalDom.getBoundingClientRect();
                var top = rect.top;
                if (top <= fixedTop) {
                    fixedDom.style.display = "block";
                    normalDom.style.opacity = 0;
                } else {
                    fixedDom.style.display = "none";
                    normalDom.style.opacity = 1;
                }
            }, 100);
        }
    };
    module.exports = utility;
});