// JavaScript Document
/* 
* Name: slider_1
* Copyright: 某年某月 (周德志)
* Date: 2014-12-16 
* Description: 自定义alert v1.0  
* Funtion:   成功(success)、失败(fail)、警告(alarm)、对话（confirm）弹窗  
*/

$(function(){
	$.extend({
		showAlert:function(option){
			var defaults={
				"target":$(".pop-wrap1"),   //弹窗目标对象		
				"title":"提示",            //弹窗提示title
				"content":"操作成功",        //弹窗提示内容
				"type":"success",           //弹窗类型  成功(success)、失败(fail)、警告(alarm)、对话（confirm）     
				"cancelShow":true,          //是否显示取消按钮  默认为显示
				"callback":null				//添加回调函数			
				}
			var option = $.extend(defaults,option);
			$(".pop-modal").show();
			option.target.show();
			option.target.find(".pop-main i").hide();
			option.target.find("."+option.type).show();
			option.target.find(".alertTitle").text(option.title);
			option.target.find(".alertContent").text(option.content);
			var hideAlert = function(){
				$(".pop-modal").hide();
				option.target.hide();				
			}
			
			if(!option.cancelShow)
			{
				option.target.find(".alertCancel").hide();
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
		
		
	$.showAlert({
		"type":"confirm",
		"callback":show		
		});
		
	function show(){
		$.showAlert({
				"cancelShow":false,	
				"callback":function(){ window.location.href="http://www.jiuxian.com"}				
				})
		
	}
		
	
	
})
