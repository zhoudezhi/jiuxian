// JavaScript Document

/* 
* Name: 店铺装修封装插件
* Date: 2014-12-30  
*/

(function($){
	
/* 
* Name: slider_1
* Copyright: 周德志 
* Date: 2014-12-16 
* Description: 渐隐渐现轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、显隐切换 
*/	
	$.fn.slider_1=function(option){
		var defaults ={
			speed : 500, //图片切换 动画时间
			pausetime : 2500, // 图片切换 动画间隔
			autoplay : true,  //默认是否自动执行动画
			trigger : "mouseenter"  //按钮触发事件
			}
		var option = $.extend(defaults,option);
		return this.each(function(){
			var $this=$(this);			
			var $prevBtn = $this.find(".prevPage");
			var $nextBtn = $this.find(".nextPage");
			var $bigUl = $this.find(".bigUl");
			var $smallUl = $this.find(".smallUl");
			var $numBtn = $smallUl.find("li");			
			var sliderLength = $bigUl.find("li").length;
			var currentPage = 0;
			var time = null;
			var index = 1;
			$bigUl.find("li:first").css({"z-index":"1"}).addClass("on");
			
			/*显隐切换函数*/
			function hander(){
				index++;
				//var prevPage = $numBtn.index($smallUl.find("li[class=on]"));
				$bigUl.find("li").removeClass("on").stop(true,true);;	
				$bigUl.find("li").eq(currentPage).css({"opacity":"0","z-index":index}).addClass("on").stop(true,true).animate({"opacity":"1"},option.speed);						
				$numBtn.eq(currentPage).addClass("on").siblings().removeClass("on");		
			};
			
			/*下一张事件*/
			$nextBtn.bind("click",function(){
					currentPage++;
					if(currentPage==sliderLength)
					{
						currentPage = 0;
					}
					hander();
			});
			
			
			/*上一张事件*/
			$prevBtn.bind("click",function(){
					currentPage--;
					if(currentPage<0)
					{
						currentPage = sliderLength-1;
					}					
					hander();
					
			});
			
			/*数字按钮事件*/
			$numBtn.bind(option.trigger,function(){			
					var index = $numBtn.index($(this));
					if(currentPage==index)
					{	
						return false;
					}
					currentPage = index;
					hander();
									
			});
			
			/*自动播放函数*/
			function autoPlayFun(){
				 time = setInterval(function(){				
						currentPage++;
						if(currentPage==sliderLength)
						{
							currentPage = 0;
						}
						hander();
						
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
		});
	};
	
	
/* 
* Name: slider_2  
* Copyright: 周德志 
* Date: 2014-12-17
* Description: 左右无缝滚动轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、滚动切换 
*/
	$.fn.slider_2=function(option){
		var defaults ={
			speed : 500, //图片切换 动画时间
			pausetime : 2500, // 图片切换 动画间隔
			autoplay : true,  //默认是否自动执行动画
			trigger : "click"  //按钮触发事件

			}
		var option = $.extend(defaults,option);
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
		});
	};

/* 
* Name: showAlert  
* Copyright: 周德志 
* Date: 2014-12-17
* Description: 自定义弹窗 v1.0  
* Funtion:  弹窗类型  成功(success)、失败(fail)、警告(alarm)、对话（confirm）
*/
	
	$.extend({
		showAlert:function(option){
			var defaults={
				"target":$(".pop-wrap1"),   //弹窗目标对象		
				"title":"提示",            //弹窗提示title
				"content":"操作成功",        //弹窗提示内容
				"type":"success",           //弹窗类型  成功(success)、失败(fail)、警告(alarm)、对话（confirm）     
				"cancelShow":false,          //是否显示取消按钮  默认为隐藏
				"callback":null				//添加回调函数			
				}
			var option = $.extend(defaults,option);
			$(".bgPop03").show();
			option.target.show();
			option.target.find(".pop-main i").hide();
			option.target.find("."+option.type).show();
			option.target.find(".alertTitle").text(option.title);
			option.target.find(".alertContent").text(option.content);
			var hideAlert = function(){
				$(".bgPop03").hide();
				option.target.hide();				
			}
			
			if(option.cancelShow)
			{
				option.target.find(".alertCancel").show();
			}
			
			option.target.find(".alertSure").bind("click",function(){
				hideAlert();
				if(option.callback&&typeof(option.callback)=="function")
				{									
						option.callback();
						if(option.type=="confirm")
						{
							option.callback = null;   //在confirm反复调用时，须将callback置为null，否则confirm里面的callback将执行两次
						}	
				}				
			});
			
			$(".alertClose,.alertCancel").bind("click",function(){
				hideAlert();	
			});		
		}
	});	
	
})(jQuery)
