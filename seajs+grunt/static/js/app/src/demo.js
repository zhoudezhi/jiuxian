// JavaScript Document
define(function (require, exports, module) {
    var attachFastClick = require('fastclick');
    attachFastClick(document.body); //页面注册快速点击事件
    var $ = require('zepto');
    var template = require("template");
    require("helper");
    var tpl = require("tpl");
    // var $dom = $("body");
    var toast = require("toast");

    var data = {
        title: '基本例子',
        isAdmin: true,
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他'],
        num1:1,
        num2:2,
        num3:3
    };
    var html = template('test', data);
    $("body").append(html);

    var html2 = template("test-tpl",data);
    $("body").append(html2);

    var render = template.compile(tpl.error);
    var html3 = render({
        list: ['摄影', '电影', '民谣', '旅行', '吉他']
    });
    $("body").append(html3);
    toast("页面初始化");
});

