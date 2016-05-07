// JavaScript Document
/* 
* 打印机效果
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
function PrintWord() {

    if (count <= str.length) {
        obj.innerHTML = str.substring(0, count);
        count++;
    } else {
        clearInterval(time);

    }

}