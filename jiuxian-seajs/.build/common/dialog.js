// JavaScript Document
/* 
* alert提示
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 参数说明
title：提示标题
type：success（成功）、confirm（确认）、fail（失败）
callback：回调函数，用于confim确认时的回调
*/
define("../js/common/dialog", [ "jquery" ], function(require, exports, module) {
    var $ = require("jquery");
    $.extend({
        showDialog: function(options) {
            var defaults = {
                title: "提示",
                type: "success",
                callback: null
            };
            var option = $.extend(defaults, options);
            var html = '<div class="pop-mask"></div><div class="dialog-box"><i class="close-dialog"></i><p class="title">' + option.title + '</p><div class="dialog-btn"><span class="cancel-btn">取消</span><span class="sure-btn">确定</span></div></div>';
            $(".pop-mask, .dialog-box").remove();
            $("body").append(html);
            $dialog = $(".dialog-box").show();
            $mask = $(".pop-mask").show();
            if ("confirm" == option.type) {
                $dialog.find(".cancel-btn").css({
                    display: "inline-block"
                });
            } else {
                $dialog.find(".cancel-btn").css({
                    display: "none"
                });
            }
            var cancelHander = function() {
                $dialog.remove();
                $mask.remove();
            };
            $(".dialog-box .sure-btn").bind("click", function() {
                cancelHander();
                if (option.callback && typeof option.callback == "function") {
                    option.callback();
                    if (option.type == "confirm") {
                        option.callback = null;
                    }
                }
            });
            $(".dialog-box .cancel-btn,.dialog-box .close-dialog").bind("click", function() {
                cancelHander();
                option.callback = null;
            });
        }
    });
});