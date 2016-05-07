// JavaScript Document
/* 
* ToRGB函数
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 将十六进制颜色值转换为RGB格式
*/
function ToRGB(color) {
    var a = /^#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3})$/
    var reg = new RegExp(a);
    var rgb = new Array();
    if (reg.test(color)) {
        if (color.length == 4) {
            rgb[0] = color.substr(1, 1);
            rgb[0] = parseInt(rgb[0] + rgb[0], 16);
            rgb[1] = color.substr(2, 1);
            rgb[1] = parseInt(rgb[1] + rgb[1], 16);
            rgb[2] = color.substr(3, 1);
            rgb[2] = parseInt(rgb[2] + rgb[2], 16);
            return rgb;
        }
        if (color.length == 7) {
            rgb[0] = color.substr(1, 2);
            rgb[0] = parseInt(rgb[0], 16);
            rgb[1] = color.substr(3, 2);
            rgb[1] = parseInt(rgb[1], 16);
            rgb[2] = color.substr(5, 2);
            rgb[2] = parseInt(rgb[2], 16);
            return rgb;
        }
    } else {
        alert("颜色值不合法")

    }
}