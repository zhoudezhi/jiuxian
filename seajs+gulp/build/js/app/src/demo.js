// JavaScript Document
define(function (require, exports, module) {
    var attachFastClick = require("fastclick");
    attachFastClick(document.body); //页面注册快速点击事件
    var $ = require("zepto");
    //var template = require("template");
    require("helper");
    var cookie = require("cookie");
    //cookie.checkCookie();
    var errorTpl = require("../../../html/error.tpl");
    var render = template.compile(errorTpl);
    var html = render({msg: '加载失败'});
    $(".match-detail-page").html(html);
    $("body").click(function () {
        require.async("toast", function (toast) {
            //toast(cookie.getCookie("username"));
            //cookie.deleteCookie("username");
            toast("toast提示")
        });
    });


});

