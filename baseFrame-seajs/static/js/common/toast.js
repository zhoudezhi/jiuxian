// JavaScript Document
/* 
 * Name：toast 弹出框提示
 * Date: 2017-05-20
 */
define(function (require, exports, module) {
    //var toast = {};
    return function toast(text, showIn) {
        var toast = document.querySelector(".toast-box");
        if (toast || !text) {
            return false;
        }
        var showIn = showIn || 2000; // 显示时间
        var toastDom = document.createElement("div");
        toastDom.className = "toast-box";
        var p = document.createElement("p");
        p.className = "toast-msg";
        p.innerHTML = text;
        toastDom.appendChild(p);
        document.body.appendChild(toastDom);
        setTimeout(function () {
            var toast = document.querySelector(".toast-box");
            document.body.removeChild(toast);
        }, showIn);
    };
    //module.exports = toast
});


