// JavaScript Document
/* 
* 事件注册与接触绑定 
* 兼容多浏览器   监听器用于冒泡阶段  
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/

function addEvent(elementId, type, handler) { //事件注册

    var element = document.getElementById(elementId);
    try {
        if (element.addEventListener) {

            return element.addEventListener(type, handler, false);

        } else if (element.attachEvent) {

            return element.attachEvent("on" + type, handler);
        }
    } catch(e) {
        alert(e.message);
    }

}

function removeEvent(elementId, type, handler) { //事件解除
    var element = document.getElementById(elementId);
    try {
        if (element.removeEventListener) {
            return element.removeEventListener(type, handler, false)
        } else if(element.detachEvent) {
            return element.detachEvent("on" + type, handler);
        }
    }

    catch(e) {
        alert(e.message);
    }

}