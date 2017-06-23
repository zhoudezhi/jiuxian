// JavaScript Document
define(function (require/*, exports, module*/) {
    var attachFastClick = require('fastclick');
    attachFastClick(document.body); //页面注册快速点击事件
    //var $ = require('zepto');
    // var $dom = $("body");
    var toast = require("toast");
    toast("页面初始化");
});

