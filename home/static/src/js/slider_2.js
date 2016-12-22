// JavaScript Document

/* 
* Name: slider_2  
* Copyright: 某年某月 
* Date: 2014-12-17
* Description: 左右无缝滚动轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、滚动切换 
*/
define(function(require, exports, module){
    var $ = require('jquery');
	$.fn.slider_2=function(options){
		var defaults ={
			speed : 500, //图片切换 动画时间
			pausetime : 2000, // 图片切换 动画间隔
			autoplay : true,  //默认是否自动执行动画
			trigger : "click"  //按钮触发事件

			};
		var option = $.extend(defaults,options);
		return this.each(function(){
			var $this=$(this);			
			var $prevBtn = $this.find(".prevPage");
			var $nextBtn = $this.find(".nextPage");
			var $bigUl = $this.find(".bigUl");
			var $smallUl = $this.find(".smallUl");
			var sliderWidth =  $this.width();
			var sliderLength = $bigUl.find("li").length;
			var currentPage = 0;
			var time = null;
			var newHtml = $bigUl.html();
			var isAnimate = $bigUl.is(":animated");
			$bigUl.html(newHtml+newHtml);
			
			/*下一张事件*/
			$nextBtn.bind("click",function(){
				if(!isAnimate)
				{
					currentPage++;
					if(currentPage==sliderLength)
					{
						$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed,function(){
							$bigUl.css({"margin-left":"0px"});	
						});
						currentPage = 0;
						$smallUl.find("li:first").addClass("on").siblings().removeClass("on");				
					}else{
						$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed);
						$smallUl.find("li").eq(currentPage).addClass("on").siblings().removeClass("on");
						}
				}else
				{					
					return false;						
				}
			});
			
			
			/*上一张事件*/
			$prevBtn.bind("click",function(){
				if(!isAnimate)
				{
					currentPage--;
					if(currentPage<0)
					{						
						currentPage = sliderLength-1;
						$bigUl.css({"margin-left":-sliderLength*sliderWidth+"px"});
						$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed);						
						$smallUl.find("li:last").addClass("on").siblings().removeClass("on");	
									
					}else{
						$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed);						
						$smallUl.find("li").eq(currentPage).addClass("on").siblings().removeClass("on");
						}
				}else
				{					
					return false;						
				}
			});
			
			/*数字按钮事件*/
			$smallUl.find("li").bind(option.trigger,function(){				
				if(!isAnimate)
				{
					var index = $smallUl.find("li").index($(this));
					currentPage = index;
					$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed);
					$smallUl.find("li").eq(currentPage).addClass("on").siblings().removeClass("on");				
					
				}else{
					return false;			
				}
			});
			
			/*自动播放函数*/
			function autoPlayFun(){
				 time = setInterval(function(){				
					if(!isAnimate)
					{
						currentPage++;
						if(currentPage==sliderLength)
						{
							$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed,function(){
								$bigUl.css({"margin-left":"0px"});	
							});
							currentPage = 0;
							$smallUl.find("li:first").addClass("on").siblings().removeClass("on");				
						}else{
							$bigUl.stop().animate({"marginLeft":-currentPage*sliderWidth+"px"},option.speed);
							$smallUl.find("li").eq(currentPage).addClass("on").siblings().removeClass("on");
							}
					}else
					{					
						return false;						
					}
				
				},option.pausetime);
			}
			
			/*鼠标移入移出事件*/
			$this.bind("mouseenter",function(){
				if(option.autoplay)
				{
					clearInterval(time);
				}
				$prevBtn.show();
				$nextBtn.show();
			});
			$this.bind("mouseleave",function(){
				if(option.autoplay)
				{
					clearInterval(time);
					autoPlayFun();	
				}	
				$prevBtn.hide();
				$nextBtn.hide();					
			});
				
				
			/*判断是否调用自动播放函数*/
			if(option.autoplay)
			{
				autoPlayFun();					
			}
		});
	};
});