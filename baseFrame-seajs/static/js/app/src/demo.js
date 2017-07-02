// JavaScript Document
define(function (require/*, exports, module*/) {
    var attachFastClick = require('fastclick');
    attachFastClick(document.body); //页面注册快速点击事件
    var $ = require('zepto');
    var cookie = require('cookie');
    cookie.checkCookie();
    $("body").click(function () {
        require.async('toast',function (toast) {
            toast(cookie.getCookie('username'));
            cookie.deleteCookie('username');
            //toast("cookie删除成功")
        });
    });


});

