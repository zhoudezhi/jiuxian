// JavaScript Document
/* 
 * Name：tpl  公共模版文件
 * Date: 2017-05-20
 */
define(function (require, exports, module) {
    var tpl = {};
    tpl.error = '<ul {{2 | add 1 4}}>'
        +    '{{each list value i}}'
        +        '<li>索引 {{i + 1}} ：{{value}}</li>'
        +    '{{/each}}'
        + '</ul>';

    return tpl;
});