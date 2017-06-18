// JavaScript Document
/* 
* 上拉翻页，加载更多
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define(function(require,exports,module){
    var $ = require('zepto');
    return function getMore(moreHander,item){
	    		clearInterval(moreTime);
	    		var moreTime = window.setInterval(function(){
			        checkHander();
			    },125);
			    function checkHander(){
			        var $allItem = $(item);
			        var len = $allItem.length;
			        if(len<4){
			        	return false;
			        }
			        //当倒数第二个元素浮出水面时，加载更多
			        var $lastItem = $allItem[len-2];
			        if($lastItem){
			        	var rect = $lastItem.getBoundingClientRect();
				        var windowHeight = $(window).height()||568;//对于获取不到屏幕高度的浏览器，默认为568
				        var top = rect.top;
				        var width = rect.width;
				        // 如果最后一个元素已经浮出水面，则加载更多
				        if( width > 0  && top < windowHeight + 100 ){
				            moreHander && moreHander();
				        }
			        }
			    }
	}
    
})


