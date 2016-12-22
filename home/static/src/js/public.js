// JavaScript Document
define(function(require, exports, module){
	var $ = require('jquery');


	/*右边栏*/
	var loginStatus=false;  //用户登陆状态
	
	//返回顶部
	$(".gotoTop").bind("click",function(){
		$("html,body").animate({scrollTop:0},500);
	});
	
	$(".sidebarClose").bind('click',function(event){
		$(this).parent().hide();
		$(this).parents(".rSidebarItem").removeClass("on");
		event.stopPropagation();
	});
	
	function rsCartHide(){
		$("#rSidebarCart").removeClass("on");
		$("#rsCartBox").hide();
		$("#rsCartBox").attr('flag','hide');
	}
	
	//收藏按钮
	$(".sidebarUserLogin").bind({
		"mouseenter":function(){
			var className=$(this).attr("box");
			$(this).show();
			$("."+className).addClass("on");
		
		},"mouseleave":function(){
			var className=$(this).attr("box");
			$(this).hide();
			$("."+className).removeClass("on");
		}
	});
	
	$(".rightSidebarCon .collect").bind({
		"mouseenter":function(){
		if(loginStatus)
		{
			$(this).find(".rsItemCon").show();
		}
		else
		{
			if($("#rsCartBox").attr('flag')=='hide'){
				var toTopHeight = $(this).offset().top;
				$(".sidebarUserLogin").show();
				var className=$(this).attr("name");
				$(".sidebarUserLogin").css("top",toTopHeight-$(document).scrollTop()).attr("box",className);
			}		
		}
		$(this).addClass("on");
		},
		"mouseleave":function(){
			$(this).removeClass("on");
			$(this).find(".rsItemCon").hide();		
			$(".sidebarUserLogin").hide();
		}
	});
	
	$(".rightSidebarCon .collect").bind("click",function(){
		if(loginStatus)
		{
			window.open("http://www.jiuxian.com");
			rsCartHide();
		}else
		{
			if($("#rsCartBox").attr('flag')=='show'){
				var toTopHeight = $(this).offset().top;
				$(".sidebarUserLogin").show();
				var className=$(this).attr("name");
				$(".sidebarUserLogin").css("top",toTopHeight-$(document).scrollTop()).attr("box",className);
				rsCartHide();
			}
		}
	});
	
	//用户按钮
	$(".rightSidebarCon .user").bind({
		"mouseenter":function(){
		if(loginStatus)
		{
			if($("#rsCartBox").attr('flag')=='hide'){
				$(this).find(".rsItemCon").show();
				$(this).find("#sidUserLogin").show();
				$(this).find("#sidUserLoginNot").hide();
				$(this).find(".opeNews .opeNews-amount").show();
			}else
			{
				$(this).find(".rsItemCon").hide();
			}	
		}
		else
		{
			if($("#rsCartBox").attr('flag')=='hide'){
				$(this).find(".rsItemCon").show();
				$(this).find("#sidUserLogin").hide();
				$(this).find("#sidUserLoginNot").show();
				$(this).find(".opeNews .opeNews-amount").hide();
			}else
			{
				$(this).find(".rsItemCon").hide();
			}
		}
		$(this).addClass("on");
		$(".infoNumber").hide();
		},
		"mouseleave":function(){
			$(this).removeClass("on");
			$(this).find(".rsItemCon").hide();
			$(".infoNumber").show();
		}
	});
	
	$(".rightSidebarCon .user").bind('click',function(){
		$(this).find(".rsItemCon").show();
		rsCartHide();
	});
	//意见反馈
	$(".rightSidebarBot .feedback").bind({
		"mouseenter":function(){		
			$(this).addClass("on");
			if($(".sidebarUserLogin").attr('flag02')=='hide'){
				$(this).find(".rsItemCon").show();
			}else
			{
				$(this).find(".rsItemCon").hide();			
			}
		},
		"mouseleave":function(){
			$(this).removeClass("on");
			$(this).find(".rsItemCon").hide();		
			$(".sidebarUserLogin").hide();
			$(".sidebarUserLogin").attr('flag02','hide');
		}
	});
	$(".rightSidebarBot .feedback").bind("click",function(){
		if(loginStatus)
		{
			window.open("http://www.jiuxian.com");
			rsCartHide();
		}
		else
		{
			if($("#rsCartBox").attr('flag')=='show'){
				rsCartHide();
				if($(".sidebarUserLogin").attr('flag02')=='hide'){
					var toTopHeight = $(this).offset().top;
					$(".sidebarUserLogin").show();
					var className=$(this).attr("name");
					$(".sidebarUserLogin").css("top",(toTopHeight-$(document).scrollTop())+"px").attr("box",className);
					$(this).find(".rsItemCon").hide();
					$(".sidebarUserLogin").attr('flag02','show');
				}else
				{
					$(".sidebarUserLogin").hide();
					$(this).find(".rsItemCon").show();
					$(".sidebarUserLogin").attr('flag02','hide');
				}
			}
		}
	});
	$(".research-close").bind('click',function(){
		$(this).parent().hide();
	});
	//返回顶部
	$(".rightSidebarBot .code,.rightSidebarBot .backTop").bind({
		"mouseenter":function(){
			$(this).addClass("on");
			$(this).find(".rsItemCon").show();
		},
		"mouseleave":function(){
			$(this).removeClass("on");
			$(this).find(".rsItemCon").hide();	
		}
	});
	
	//购物车按钮
	$(".rightSidebarCon .cart").bind({
		"mouseenter":function(){
			$(this).addClass("on");
		},
		"mouseleave":function(){
			if($("#rsCartBox").attr('flag')=='hide'){
				$(this).removeClass("on");
			}else
			{
				$(this).addClass("on");
			}
		}
	});
	
	$("#rSidebarCart").bind('click',function(event){
		if($("#rsCartBox").attr('flag')=='hide'){
			$(this).addClass("on");
			$("#rsCartBox").show();
			$("#rsCartBox").attr('flag','show');
		}else
		{
			rsCartHide();
		}
		event.stopPropagation();
	});
	$("#rsCartBox").bind("mouseenter",function(){
		$("#rSidebarCart").addClass("on");
	});
	
	$(".rightSidebarBox").bind('click',function(event){
		event.stopPropagation();
	});
	$(document).bind('click',function(){
		rsCartHide();
	});
	
	$("#rsCartBox .rsCartClose,.rightSidebarBot .code,.rightSidebarBot .backTop").bind('click',function(){
		rsCartHide();
	});
	
	//购物车高度
	var winHei=$(window).height();
	$("#rsCartBox").css('height',winHei+'px');
	$("#rsCartBox .rsCartTabBox").css('height',(winHei-203)+'px');
	$(".rightSidebar").css('height',winHei+'px');
	
	$(window).bind('resize',function(){
		var winHei_1=$(window).height();
		$("#rsCartBox").css('height',winHei_1+'px');
		$("#rsCartBox .rsCartTabBox").css('height',(winHei_1-203)+'px');
		$(".rightSidebar").css('height',winHei_1+'px');
	});
	//购物车 鼠标滑过商品
	$(".rsCartTable > .rsCartItem").hover(function(){
		$(this).find(".comAmount a").show();
		$(this).find(".rsCartItem-del").show();
		$(this).css('background','#f8f8f8');
	},function(){
		$(this).find(".comAmount a").hide();
		$(this).find(".rsCartItem-del").hide();
		$(this).css('background','none');
	});
	$(".rsCartTable .rsCartComb").hover(function(){
		$(this).find(".rsCartItem-del").show();
	},function(){
		$(this).find(".rsCartItem-del").hide();
	});
	//购物车 删除商品
	var priAll=0;
	function sumPrice(){
		var itemLen=$(".rsCartTable .rsCartItem").length;
		$("#amountAll b").text(itemLen);
		var chaLength=0;
		$(".rsCartTable .rsCartItem").each(function(){
			chaLength=Number($(this).find(".info03").text().substring(1))*parseInt($(this).find(".comAmount span").text());
			priAll+=chaLength;
		});
		$("#priAll span").text(priAll);
	}
	sumPrice();
	
	$(".rsCartItem-del").bind('click',function(){
		$(this).parent(".rsCartItem,.rsCartComb").remove();
		var itemLen=$(".rsCartTable .rsCartItem").length;
		if(itemLen===0){
			$("#rsCartTable").hide();
			$("#rsCartEmpty").show();
			$(".rsCartTotal").hide();
			$(".rsCartBut").hide();
		}else
		{
			$("#rsCartTable").show();
			$("#rsCartEmpty").hide();
		}
		priAll=0;
		sumPrice();
	});
	//购物车 加减商品数量
	$(".rsCartItem").each(function(){
		var amount = $(this).find(".comAmount span").text();
		if(amount==1){
			$(this).find(".comAmount .minus").addClass("on");
		}
		if(amount==99){
			$(this).find(".comAmount .plus").addClass("on");
		}
	});
	
	$(".comAmount .minus").bind('click',function(){
		var amount = $(this).siblings("span").text();
		if(amount>1){
			amount--;
			$(this).siblings("span").text(amount);
			if(amount==1){
				$(this).addClass("on");
			}
			if(amount<99){
				$(this).siblings(".plus").removeClass("on");
			}
		}
		priAll=0;
		sumPrice();
	});
	
	$(".comAmount .plus").bind('click',function(){
		var amount = $(this).siblings("span").text();
		if(amount<99){
			amount++;
			$(this).siblings("span").text(amount);
			if(amount==99){
				$(this).addClass("on");
			}
			if(amount>1){
				$(this).siblings(".minus").removeClass("on");
			}
		}
		priAll=0;
		sumPrice();
	});
	
	/*右边栏end*/
	
	/*页头start*/
	$(".topHeaderRight .hd-n1,.topHeaderRight .hd-n8").hover(function(){
		$(this).addClass("on");		
		},function(){
			$(this).removeClass("on");	
	});

	/*搜索框*/
	$(".headerSearch .search-form").val("一坛香");
	$(".headerSearch .search-form").focus(function(e) {
		var value=$.trim($(this).val());
		if(value=="一坛香")
		{
			$(this).val("");
		}		
    });
	$(".headerSearch .search-form").blur(function(e) {
        var value=$.trim($(this).val()); 
		if(value==="")
		{
			$(this).val("一坛香");
		}
    });
	
	$(".headerSearch .search-form").keyup(getSearchResult);
	$(".headerSearch .search-form").keydown(navList);
	//$("#searchCon li").on("click mouseenter mouseleave",listHover);
	
	function getSearchResult(e){
			e=e||window.event;			
			var keywords=$.trim($("#search-form").val());
			if(keywords===""){
				//$("#searchCon").hide();
				return false;
			}
			if((e.which>=48&&e.which<=57)||(e.which>=96&&e.which<=105)||(e.which>=65&&e.which<=90)||e.which==8||e.which==46||e.which==13||e.which==32)
			{
			 	if(keywords.length>0){	
					
					var domain_list='http://list.jiuxian.com';					
					var real_url = domain_list + "/associate.htm?wd=" + keywords + "&t=" + new Date().getTime();
					$.support.cors = true;
					$.ajax({
						type: "POST",
						url: domain_list + "/associate.htm?t=" + new Date().getTime(),
						data: {
							'wd':keywords
						},
						/*url: "/httpProxyAccess.htm?t=" + new Date().getTime(),
						data: {
							target: real_url
						},*/
						dataType: "json",
						success: function(data) {
							if (data === null) {
								return null;
							}
							if (data.resultList !== "") {
								$("#searchCon").show();
								var keyslistHtml = "<ul>";
								var jsonList = data.resultList;
								for (var i = 0; i < jsonList.length; i++) {
									keyslistHtml += '<li class="clearfix"><a href="'+jsonList[i].url+'"><span>'+jsonList[i].name+'</span><em>约<b>'+jsonList[i].count+'</b>件商品</em></a></li>';									
								}												
								keyslistHtml += "</ul>";
								keyslistHtml += '<div class="bot clearfix"><span class="search-close"><i></i></span></div>';	
								$("#searchCon").empty().html(keyslistHtml);
							} else {
								$("#searchCon").hide();
							}
						}
					});
			 	 }
			}
		}

		function navList(e){
				 switch (e.which)
				 {
					 case 38://上一个
					  
					 if($("#searchCon li").hasClass("on"))  
					 	{
						  $("#searchCon li.on").removeClass("on").prev().addClass("on");
						 } 
					  else
						{
				       	  $("#searchCon li:last").addClass("on");
					     }
					 $("#search-form").val($("#searchCon li.on span").text());
					 break;					
					 case 40:    //下一个
					 
					 if($("#searchCon li").hasClass("on"))  
					 	{
						  $("#searchCon li.on").removeClass("on").next().addClass("on");
						 } 
					else
					 	{
						  $("#searchCon li:first").addClass("on");
						}
					 $("#search-form").val($("#searchCon li.on span").text());					
					 break;
					 case 13:   //回车		
					 $("#search-form").val($("#searchCon li.on span").text());
					 var url= $("#searchCon li.on").find("a").attr("href");			
					 $("#searchCon").empty().hide();
					 $("#search-form").focus();					 
					 window.location.href = url;
					 break;
				 }
				
			}
			
	function listHover(e){
				if(e.type=="mouseenter")
				{
					$("#searchCon li").removeClass("on");
					$(this).addClass("on");
				}
				if(e.type=="mouseleave")
				{
					$("#searchCon li").removeClass("on");
				}
			    if(e.type=="click")
				{
					
					$("#searchCon").empty().hide();
					$("#search-form").focus();
				}
				$("#search-form").val($("#searchCon li.on span").text());
			
			}
	
	$(".headerSearch .searchCon").bind('mouseleave',function(){
		$(this).hide();
	});
	
	$(".search-close").on('click',function(){
		$(this).parents(".searchCon").hide();
	});
	
/*	$(".headerSearch .search-form").bind('keyup',function(){
		$(this).parent().siblings(".searchCon").show();
		if($(this).val()==""){
			$(this).parent().siblings(".searchCon").hide();
		}
	});*/
	
/*	$(".searchCon li").bind("mouseenter",function(){
		$(".searchCon li").removeClass("on");
		$(this).addClass("on");	
		$(".searchCon li:last").removeClass("on");
	});*/
	
	/*页头end*/
	/*菜单*/
	$(".categoryBox li").mouseenter(function(){
		var $parents=$(this).parents(".navCategoryMenu");
		var index=$(".categoryBox li").index($(this));
		$(this).addClass("on");
		$parents.find(".menuBox").hide();
		$parents.find(".menuBox").eq(index).show();		
		var menuItemsHei=0;
		$parents.find(".menuBox").eq(index).find(".menuItem").each(function(){
			menuItemsHei+=$(this).height();
		});
		if((470-menuItemsHei)>=0){
			$parents.find(".menuBox").eq(index).find(".menuHeight .menuCon-list").css('height',(470-menuItemsHei)+'px');
		}else
		{
			$parents.find(".menuBox").eq(index).find(".menuHeight .menuCon-list").css('height','0px');
		}
	});
	$(".categoryBox li").mouseleave(function(e) {
        $(this).removeClass("on");
		$(".menuBox").hide();
    });
	
	$(".menuBox").mouseenter(function(e) {
        var index=$(".menuBox").index($(this));
		$(this).show();
		$(".categoryBox li").eq(index).addClass("on");
    });
	$(".menuBox").mouseleave(function(e) {
        $(".categoryBox li").removeClass("on");
		$(this).hide();
    });
	
	$(".menuCon-filter .filter").bind('click',function(){
		$(this).addClass("on");
		$(this).siblings(".filter").removeClass("on");
	});
	
	var braLength = Math.ceil($(".menuCon-brand a").length/6)*22;
	$(".menuCon-brand").css('height',braLength);
	
	//一键选酒下拉框
	$(".nav .navList li").bind('mouseenter',function(){
		$(this).find(".quickSelect").show();
	});
	
	$(".nav .navList li").bind('mouseleave',function(){
		$(this).find(".quickSelect").hide();
	});
	/*菜单end*/
	/*页脚*/
	$(".ftRight-form input").focus(function(e) {
        var value=$.trim($(this).val());
		$(this).next().hide();
		if(value=="请输入您的邮箱地址")
		{
			$(this).val("");			
		}
    });
	
	$(".ftRight-form input").blur(function(e) {
        var value=$.trim($(this).val()); 
		if(value==="")
		{
			$(this).next().show();
		}
    });
	
	$(".ftRight-form span").click(function(e) {
		$(this).hide();
		$(this).prev().focus();		
    });
	
	$("#jxWeixin").mouseenter(function(){
		var codeState = $(this).attr('flag');
		if(codeState=='hide')
		{
			$("#weixinCode").show();
			$(this).attr('flag','show');
		}else
		{
			$("#weixinCode").hide();
			$(this).attr('flag','hide');
		}
		
	});
	/*页脚end*/

});

