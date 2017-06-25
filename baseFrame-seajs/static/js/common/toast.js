// JavaScript Document
/* 
 * Name：toast 弹出框提示
 * Date: 2017-05-20
 */
define(function (require, exports, module) {
    //var toast = {};
    return function toast(text, showIn) {
        var toast = document.querySelector('.toast-msg');
        if (toast || !text) {
            return false;
        }
        var showIn = showIn || 2000; // 显示时间
        var toastDom = document.createElement('div');
        toastDom.className = 'toast-msg';
        toastDom.innerHTML = text;
        document.body.appendChild(toastDom);
        toast = document.querySelector('.toast-msg');
        toast.style.display = 'block';
        setTimeout(function () {
            document.body.removeChild(toast);
        }, showIn);
    };
    //module.exports = toast
});


