// JavaScript Document
/* 
* 返回顶部
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/goTop", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    return function goTop() {
        clearInterval(time);
        var $goTop = $(".go-top");
        var time = setInterval(function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 400) {
                $goTop.show();
            } else {
                $goTop.hide();
            }
        }, 500);
        $goTop.bind("click", function() {
            $goTop.hide();
            $(window).scrollTop(0);
        });
    };
});