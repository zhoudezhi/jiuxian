// JavaScript Document
define("../js/app/dist/demo", [ "fastclick", "zepto", "toast" ], function(require, exports, module) {
    var attachFastClick = require("fastclick");
    attachFastClick(document.body);
    //页面注册快速点击事件
    var $ = require("zepto");
    var $dom = $("body");
    var toast = require("toast");
    toast("页面初始化");
});
define("../js/tpl/page", [], function(require, exports, module) {
    var source = '<div class="bigImg">' + '<ul class="bigUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li style="background:<%= list[i].color %>;">' + '<div class="ban_cter">' + '<div class="imgBox">' + '<a  class="focusArea" target="_blank" href="javascript:;">' + '<img class="imgAnimate" src="<%= list[i].url %>" width="820" height="470" />' + '<img class="imgText" src="<%= list[i].text %>"/>' + "</a>" + "</div>" + '<div class="mav">' + '<a style="background:url(../images/smallImg.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"><i></i></a>' + '<span class="mask1"></span>' + '<a style="background:url(../images/smallImg2.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"></a>' + '<span class="mask2" ></span>' + "</div>" + "</div>" + "</li>" + "<% } %>" + "</ul>" + "</div>" + '<div class="smallBtn">' + '<ul class="smallUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li class="<% if (i==0) { %>on<% } %>"> <%= i+1 %></li>' + "<% } %>" + "</ul>" + "</div>";
    /*var source = '<ul>'
	+    '<% for (var i = 0; i < list.length; i ++) { %>'
	+        '<li>索引 <%= i + 1 %> ：<%= list[i] %></li>'
	+    '<% } %>'
	+ '</ul>';*/
    return source;
});
// JavaScript Document
/* 
* toast提示
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/toast", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    //var toast = {};
    return function toast(text, showIn) {
        var $toast = $(".toast-msg");
        //var $mask = $('.pop-mask');
        if ($toast.length != 0 || !text) {
            return false;
        }
        var showIn = showIn || 2e3;
        // 显示时间
        /*if($mask.length == 0){
                    var mask = document.createElement('div');
                    mask.className = 'pop-mask';
                    document.body.appendChild(mask);
                }*/
        var toastDom = document.createElement("div");
        toastDom.className = "toast-msg";
        toastDom.innerHTML = text;
        document.body.appendChild(toastDom);
        //var $mask = $('.pop-mask')
        var $toast = $(".toast-msg");
        //$mask.show();
        $toast.show();
        setTimeout(function() {
            //$mask.remove();
            $toast.remove();
        }, showIn);
    };
});