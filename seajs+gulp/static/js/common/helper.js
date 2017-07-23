// JavaScript Document
/* 
 * Name：helper 模版辅助方法
 * Date: 2017-05-20
 helper.js 函数命名规则 $functionName,和普通函数区分
 template.helper('$twoDecimalPlaces',function(money){
 return twoDecimalPlaces(money);
 });
 */
define(function (require, exports, module) {
    var template = require("template");
    template.helper('$getWinHeight', function () {
        return window.innerHeight;
    });

    template.helper('$halfWinWidth', function () {
        return window.innerWidth * 0.5;
    });

    return template
});



