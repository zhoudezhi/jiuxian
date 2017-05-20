// JavaScript Document
/* 
* toast提示
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
define("../js/common/msg", [], function(require, exports, module) {
    var dialog = {};
    function msg(text, showIn) {
        var $toast = $(".toast-box");
        var $mask = $(".mask-page");
        if ($toast.length != 0 || !text) {
            return false;
        }
        var showIn = showIn || 1e3;
        // 显示时间
        if ($mask.length == 0) {
            var mask = document.createElement("div");
            mask.className = "mask-page";
            document.body.appendChild(mask);
        }
        var toast = document.createElement("div");
        toast.className = "toast-box";
        toast.innerHTML = text;
        document.body.appendChild(toast);
        $mask = $(mask).show();
        $toast = $(toast).show();
        setTimeout(function() {
            $mask.remove();
            $toast.remove();
        }, showIn);
    }
    module.exports = dialog;
});