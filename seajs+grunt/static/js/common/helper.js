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
    template.defaults.imports.add = function (num1,num2,num3) {
        return num1+num2+num3;
    };

    template.defaults.imports.hander = function (num1,num2,num3) {
        return num1+num2*num3;
    };

    return template
});



