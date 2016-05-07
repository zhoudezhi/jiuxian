// JavaScript Document
$(document).ready(function(){
	

	$(".leftNav .userPage .sort").click(function(e) {
		var flag = $(this).next(".sub").css("display");
		if(flag=="block"){
			$(this).next(".sub").hide();
		}else{
			$(this).next(".sub").show();
		}
		return false;
	});

	/*侧导航start*/
	var winHeight = $(window).height();
	$(".shopBox .leftNav").css({"height":winHeight-71});
	$(window).bind("resize",function(){
		var reHeight = $(window).height();
		$(".shopBox .leftNav").css({"height":reHeight-71});	
	});
	//侧导航开关
	$(".leftNav .navSwitch").toggle(function(){
		$(".leftNav").stop().animate({'margin-left':'-208px'},300);
		$(".mainEdit").stop().animate({'margin-left':'2px'},300);
		$(this).addClass('open');
	},function(){
		$(".leftNav").stop().animate({'margin-left':0},300);
		$(".mainEdit").stop().animate({'margin-left':'210px'},300);
		$(this).removeClass('open');
	});
	//全选
	$("#checkAll").change(function(){
		if($(this).is(':checked')){
			$(".editManTable input[name=items]:checkbox").attr('checked','checked');
		}else{
			$(".editManTable input[name=items]:checkbox").removeAttr('checked');
		}
	});
	//大图全选
	$("#checkAllBig").change(function(){
		if($(this).is(':checked')){
			$(".manageBigPic input[name=items]:checkbox").attr('checked','checked');
		}else{
			$(".manageBigPic input[name=items]:checkbox").removeAttr('checked');
		}
	});
	//删除
	$(".editManTable .delete").bind('click',function(){
		if(confirm("是否确定删除？"))
		{
			$(this).parents("tr").remove();
		}else{
			return;
		}
	});
	$("#deleteChecked").bind('click',function(){
		if($(".editManTable input[name=items]:checked").length==0){
			alert("请选择要删除的内容！")
		}else{
			if(confirm("是否确定删除选中内容？"))
			{
				$(".editManTable input[name=items]:checked").parents("tr").remove();
			}else{
				return;
			}
		}
	});
	$("#deleteCom").bind('click',function(){
		if($(".editManTable input[name=items]:checked").length==0){
			alert("请选择要删除的内容！")
		}else{
			if(confirm("彻底删除后将无法恢复，是否确认删除？"))
			{
				$(".editManTable input[name=items]:checked").parents("tr").remove();
			}else{
				return;
			}
		}
	});
	//大图删除
	$(".manageBigPic .delete").bind('click',function(){
		if(confirm("是否确定删除？"))
		{
			$(this).parents("li").remove();
		}else{
			return;
		}
	});
	$("#deleteCheckedBig").bind('click',function(){
		if($(".manageBigPic input[name=items]:checked").length==0){
			alert("请选择要删除的内容！")
		}else{
			if(confirm("是否确定删除选中内容？"))
			{
				$(".manageBigPic input[name=items]:checked").parents("li").remove();
			}else{
				return;
			}
		}
	});
	$("#deleteComBig").bind('click',function(){
		if($(".manageBigPic input[name=items]:checked").length==0){
			alert("请选择要删除的内容！")
		}else{
			if(confirm("彻底删除后将无法恢复，是否确认删除？"))
			{
				$(".manageBigPic input[name=items]:checked").parents("li").remove();
			}else{
				return;
			}
		}
	});
	//恢复选中
	/*$("#restoreCon").bind('click',function(){
		if($(".manageBigPic input[name=items]:checked").length==0){
			alert("请选择要恢复的内容！")
		}else{
			if(confirm("是否确认恢复选中内容？"))
			{
				$(".editManTable input[name=items]:checked").parents("tr").remove();
			}else{
				return;
			}
		}
	});
	$("#restoreConBig,#restoreCon").bind('click',function(){
		if($(".manageBigPic input[name=items]:checked").length==0){
			alert("是否确认恢复选中内容！")
		}else{
			if(confirm("是否确认恢复内容？"))
			{
				$(".manageBigPic input[name=items]:checked").parents("li").remove();
			}else{
				return;
			}
		}
	});*/
	//恢复
	/*$(".editManTable .restore").bind('click',function(){
		if(confirm("是否确定恢复？"))
		{
			$(this).parents("tr").remove();
		}else{
			return;
		}
	});
	$(".manageBigPic .restore").bind('click',function(){
		if(confirm("是否确定恢复？"))
		{
			$(this).parents("li").remove();
		}else{
			return;
		}
	});*/
	//隔行换背景色
	$(".editManTable tr:even").addClass('bg');
	$(".editManTable tr:odd").removeClass('bg');
});