// JavaScript Document
/* Name: slider_2  
* Copyright: 某年某月 (周德志)
* Date: 2014-12-17
* Description: 左右无缝滚动轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、滚动切换 
*/
(function($){
	$.fn.slider = function(option){
		var defaults = {
			speed : 300, //图片切换 动画时间
			pausetime : 4000, // 图片切换 动画间隔
			autoplay : true,  //默认是否自动执行动画
			trigger : "mouseenter"  //按钮触发事件		
		}
		var option = $.extend(defaults,option);
		return this.each(function(){
			var $this = $(this);
			var $prevBtn = $this.find(".prevPage");
			var $nextBtn = $this.find(".nextPage");
			var $maskLeft =  $this.find(".maskLeft");
			var $maskRight =  $this.find(".maskRight");
			var $bigUl = $this.find(".bigUl");
			var $smallUl = $this.find(".smallUl");
			var sliderWidth =  $this.width();
			var sliderLength = $bigUl.find("li").length;
			var currentPage = 1;
			var time = null;
			$bigUl.find("li:lt(3)").clone().appendTo($bigUl);
			$bigUl.find("li.on").find(".mask").hide();
			//var screenWidth = window.screen.width;
			//$this.parent().css({"width":screenWidth-17+"px"});
			
			/*下一张事件*/
			$nextBtn.add($maskRight).bind("click",function(){
				currentPage++;
				$(".mask").show();
				if(currentPage==sliderLength+1)
				{
					$bigUl.find("li").eq(currentPage).find(".mask").hide();
					$bigUl.stop(true,true).animate({"margin-left":-currentPage*sliderWidth+"px"},option.speed,function(){
						$(this).css({"margin-left":-sliderWidth+"px"});						
					});
					currentPage = 1;
					$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");					
				}else{
					$bigUl.stop(true,true).animate({"margin-left":-currentPage*sliderWidth+"px"},option.speed);	
					$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");
				}
				$bigUl.find("li").removeClass("on").eq(currentPage).addClass("on").find(".mask").hide();
				
			});
			
			/*上一张事件*/
			$prevBtn.add($maskLeft).bind("click",function(){
				currentPage--;
				$(".mask").show();
				if(currentPage==0||currentPage<0)
				{
					$bigUl.find("li").eq(currentPage).find(".mask").hide();
					$bigUl.css({"margin-left":-sliderWidth*(sliderLength+1)+"px"});
					$bigUl.stop(true,true).animate({"margin-left":-sliderWidth*sliderLength+"px"},option.speed);
					currentPage = sliderLength;
					$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");
				}else{
					$bigUl.stop(true,true).animate({"margin-left":-currentPage*sliderWidth+"px"},option.speed);				
					$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");
				}
				$bigUl.find("li").removeClass("on").eq(currentPage).addClass("on").find(".mask").hide();
			});
			
			/*数字按钮事件*/
			$smallUl.find("li").bind(option.trigger,function(){				
					var index = $smallUl.find("li").index($(this));
					currentPage = index;
					$(".mask").show();
					$bigUl.find("li").removeClass("on").eq(currentPage+1).addClass("on").find(".mask").hide();
					$bigUl.stop(true,true).animate({"marginLeft":-(currentPage+1)*sliderWidth+"px"},option.speed);
					$smallUl.find("li").eq(currentPage).addClass("on").siblings().removeClass("on");				
			});
			
			/*自动播放函数*/
			function autoPlayFun(){
				 time = setInterval(function(){				
						currentPage++;
						$(".mask").show();
						if(currentPage==sliderLength+1)
						{
							$bigUl.find("li").eq(currentPage).find(".mask").hide();
							$bigUl.stop(true,true).animate({"margin-left":-currentPage*sliderWidth+"px"},option.speed,function(){
								$(this).css({"margin-left":-sliderWidth+"px"});						
							});
							currentPage = 1;
							$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");					
						}else{
							$bigUl.stop(true,true).animate({"margin-left":-currentPage*sliderWidth+"px"},option.speed);	
							$smallUl.find("li").removeClass("on").eq(currentPage-1).addClass("on");
						}
						$bigUl.find("li").removeClass("on").eq(currentPage).addClass("on").find(".mask").hide();			
				},option.pausetime);
			};
			
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

		
		})
	}

})(jQuery)