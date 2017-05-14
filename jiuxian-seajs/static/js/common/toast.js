// JavaScript Document
/* 
* toast提示
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
define(function(require,exports,module){
    var $ = require('jquery');
    var toast = {};
    toast.msg = function(text,showIn) {
        var $toast = $('.toast-msg');
        //var $mask = $('.pop-mask');
        if($toast.length !=0 || !text ){
            return false;
        }
        var showIn = showIn||2000; // 显示时间
        /*if($mask.length == 0){
            var mask = document.createElement('div');
            mask.className = 'pop-mask';
            document.body.appendChild(mask);
        }*/
        var toastDom = document.createElement('div');
        toastDom.className = 'toast-msg';
        toastDom.innerHTML = text;
        document.body.appendChild(toastDom);
        //var $mask = $('.pop-mask')
        var $toast = $('.toast-msg');
        //$mask.show();
        $toast.show();
        setTimeout(function(){
            //$mask.remove();
            $toast.remove();
        },showIn);
    };   
    module.exports = toast
})


