// JavaScript Document
define(function (require, exports, module) {
    var attachFastClick = require('fastclick');
    attachFastClick(document.body); //页面注册快速点击事件
    var $ = require('zepto');
    var template = require("template");
    require("helper");
    var html = template.render("error-page-tpl",{msg:""});
    $("body").html(html);
});

