// JavaScript Document
/* 
* alert提示
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 参数说明
title：提示标题
type：success（成功）、confirm（确认）、fail（失败）
callback：回调函数，用于confim确认时的回调
*/
define(function(require,exports,module){
    var $ = require('zepto');
    return  function dialog(options) {
                var defaults = {
                    title: "提示",
                    type: "success",
                    sureText:"确定",
                    cancelText:"取消",
                    callback: null
                };
                var option = $.extend(defaults,options);
                if($(".dialog-box").length){
                    return false;
                }
                var html = '<div class="pop-mask"></div><div class="dialog-box"><p class="title">' + option.title + '</p><div class="dialog-btn"><ul><li class="cancel-btn">'+ option.cancelText +'</li><li class="sure-btn">'+ option.sureText +'</li></ul></div></div>';
                $(".pop-mask, .dialog-box").remove();
                $("body").append(html);
                $dialog = $(".dialog-box").show();
                $mask = $(".pop-mask").show();
                if("confirm" == option.type){
                    $dialog.find(".cancel-btn").css({display: "inline-block"});
                }else{
                    $dialog.find(".cancel-btn").css({display: "none"});
                    $dialog.find(".sure-btn").addClass("only-sure-btn")
                }
                var cancelHander = function() {
                    $dialog.remove();
                    $mask.remove();
                };
                $(".dialog-box .sure-btn").bind("click", function() {
                    cancelHander();
                    if(option.callback && typeof (option.callback) == "function"){
                        option.callback();
                        if(option.type == "confirm"){
                            option.callback = null
                        }
                    }
                });
                $(".dialog-box .cancel-btn").bind("click", function() {
                    cancelHander();
                    option.callback = null; 
                });
            }

    //module.exports = dialog
})



