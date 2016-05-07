// JavaScript Document
$(document).ready(function(e) {
	
	//图片延迟加载
	/*$(".shopCouponBox img,.shopFocusBox img,.shopComBox img,.shopSellerBox img").lazyload({
		placeholder : "http://misc.jiuxian.com/images/shop/shopDecoration/loading.gif",        
		effect : "fadeIn",
		threshold:200
	});*/
	
	$("img").lazyload({
		placeholder : "http://misc.jiuxian.com/images/shop/shopDecoration/loading.gif",        
		effect : "fadeIn",
		threshold:600
	});
	
	//页面背景处理
	
	
	var bgColor = $("#layoutContain").attr("bgColor");
	var bgImage = $("#layoutContain").attr("bgImage");
	var reaptPattern = $("#layoutContain").attr("reaptPattern");
	var bgData;
	if(bgColor==""&&bgImage!=""){
		bgData = "url("+bgImage+") "+reaptPattern;
	}else if(bgColor!=""&&bgImage!=""){
		bgData = "#"+bgColor+" url("+bgImage+") "+reaptPattern;
	}else if(bgColor!=""&&bgImage==""){
		bgData = "#"+bgColor;
	}else if(bgColor==""&&bgImage==""){
		bgData = "none";
	}
	$("#layoutContain").css({"background":bgData});

	//侧边栏处理
	$(".shopSidesNavBox").each(function() {
		var winWidth_1 = $(window).width();
		var scrollTop = $(window).scrollTop();
        var shopSidesNavBoxDataString = $(this).attr("data");	
		var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
		$(this).css({"top":shopSidesNavBoxData["heightToTop"]+"px",
					 "width":shopSidesNavBoxData["imgWidth"]+"px",
					 "height":shopSidesNavBoxData["imgHeight"]+"px"
					 });
		if(shopSidesNavBoxData["isFirstShow"]=="2"){  //第一屏是否显示   默认隐藏
		 	$(this).show();		
		}else{
			$(this).hide();	
		}		
		if(scrollTop>500){ 
		 	$(this).show();		
		}
		if(shopSidesNavBoxData["showLocation"]==1){   //侧边栏位置  
			var left = (winWidth_1-1000)/2+1000;
		 	$(this).css({"left":left+"px"})
		}else{
			var left = (winWidth_1-1000)/2-shopSidesNavBoxData["imgWidth"];
		 	$(this).css({"left":left+"px"});			
		}		
		
		$(this).find("li").each(function(index) {
            $(this).css({"height":shopSidesNavBoxData["detail"][index]});
        });	
    });

	$(window).bind("resize",function(){
		adjustuserDefinedBox();	
		var winWidth_2 = $(window).width(); 
		$(".shopSidesNavBox").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["showLocation"]=="1"){   //侧边栏位置  
				var left = (winWidth_2-1000)/2+1000;
				$(this).css({"left":left+"px"})
			}else{
				var left = (winWidth_2-1000)/2-shopSidesNavBoxData["imgWidth"];
				$(this).css({"left":left+"px"})
			}
   	 	});
	});
	
	$(window).bind("scroll",function(){
		$(".shopSidesNavBox").each(function(index, element) {
			var shopSidesNavBoxDataString = $(this).attr("data");	
			var shopSidesNavBoxData = eval("("+shopSidesNavBoxDataString+")");
			if(shopSidesNavBoxData["isFirstShow"]=="1"){
				var scrollTop = $(window).scrollTop();
				if(scrollTop>500){
					$(this).show();			
				}else{
					$(this).hide();	
				}
			}
		});
	});
	
	
	
	
	//轮播调用
	$(".mainBanner").each(function() {
        var sliderTime = parseInt($(this).attr("sliderTime"));
		$(this).slider_1({pausetime:sliderTime*1000}); 
    });	
	 
    $(".floorSlider").each(function() {
	   var sliderTime = parseInt($(this).attr("sliderTime"));
       $(this).slider_2({pausetime:sliderTime*1000});
    });
	
	//倒计时	
	$(".shopCountdown").each(function() {
        var $this = $(this);
		handleTime($this);

    });

	function handleTime(obj){
		var data = obj.attr("data");
		var time = eval("("+data+")");
		var timeStart = Date.parse(time["timeStart"]);
		var timeEnd = Date.parse(time["timeEnd"]);
		var timeNow = new Date().getTime();
		var temp;
		if(timeStart>timeNow){
			 //活动未开始
			 temp=parseInt((timeStart-timeNow)/1000); 
			 obj.find(".title").text("距离活动开始还有");
		}else{
			//活动已开始
			 temp=parseInt((timeEnd-timeNow)/1000); 
			 obj.find(".title").text("距离活动结束还有");
		}
		var timeChange=setInterval(function(){
		temp--;
		var day=parseInt(temp/(24*3600));
		day=day<10?"0"+day:day;
		var hour=parseInt((temp%(24*3600))/3600);
		hour=hour<10?"0"+hour:hour;
		var minute=parseInt((temp%3600)/60);
		minute=minute<10?"0"+minute:minute
		var second=parseInt(temp%60);
		second=second<10?"0"+second:second;
		if(temp>0)
		{
			obj.find(".day").text(day);
			obj.find(".hour").text(hour);
			obj.find(".minute").text(minute);
			obj.find(".second").text(second);
		}
		else
		{
			obj.find(".day").text("00");
			obj.find(".hour").text("00");
			obj.find(".minute").text("00");
			obj.find(".second").text("00");
			clearInterval(timeChange);	
		}	
		},1000)	
	}
	
	//自定义区域图片居中处理函数
	function adjustuserDefinedBox(){
		$(".userDefinedBox[userconwidth=1920]").each(function() {
			var width = $(window).width();
			var marginWidth = (1920-width)/2;
			$(this).css({"width":"1920","margin-left":-marginWidth});			
		});
	}
	
	adjustuserDefinedBox();

	
	//带价格的搜索框响应函数
	$(".shopSearchBox .seaBut").click(function(){
		var keywords = $(this).parents(".shopSearchBox").find(".seaText").val();
		var highPrice = $(this).siblings("span").find(".priVal").eq(1).find("input").val();
		var lowPrice = $(this).siblings("span").find(".priVal").eq(0).find("input").val();
		
		var linkUrl= "http://list.jiuxian.com/search.htm?keys=" + encodeURI(keywords) +"&pr="+lowPrice+"|" +highPrice;
		window.open(linkUrl);
		
	});	
	//导航栏的搜索框
	$(".shopNavSearch .search-but").click(function(){
		var keywords = $(this).parents(".shopNavSearch").find(".search-text").val();
		var linkUrl= "http://list.jiuxian.com/search.htm?keys=" + encodeURI(keywords);
		window.open(linkUrl);
		
	});	
	
	
	
	
	/*优惠券*/
	$(".shopCouponBox a").click(function(){
		var quanId=$(this).attr('couponId');
		var gx = new Date().getTime();
		var actId=$(this).attr('activeid');
		var local=window.location.href;
		var act_request_url=domain_special+"/coupon/receiveCoupon.htm?actId="+actId+"&couponId="+quanId + "&pageUrl="+local+"&t="+ gx;
		$.getJSON("/httpProxyAccess.htm?t="+gx,{target:act_request_url},
				function(data){
			if(null!=data){
	        		if(data.status==1){
	        			alert("恭喜您领取优惠券成功！");
	        		}else if(data.status==2){
	        			if(confirm("您还未登录不能领取优惠券，是否现在登录？")){
	    				    location=domain_passprot+"/login.htm?from="+local;
	    			    }else{
	    			    	return;
	    				}
	        		}else if(data.status==5){
	        			alert("您今天已经领过该优惠券！");
	        		}else if(data.status==7){
	        			alert("库存不足！");
	        		}else if(data.status==4){
	        			alert("优惠券Id不存在！");
	        		}else if(data.status==9){
	        			alert("活动已经结束！");
	        		}else if(data.status==8){
	        			alert("活动未开始！");
	        			
	        		}else if(data.status==12){
	        			if(confirm("亲，该领券需要绑定手机号，是否去绑定？")){
	        				setCookie("receiveCoupon_BindMobileSkipUrl","."+local+".",1);
	        				window.location.href=domain_member + "/myaccount/verify_phone.htm";        				
	    			    }else{
	    			    	return;
	    				}
	        		}
	        	}		
	  });
	});
	
	//动态更新商品的价格
	//价格同步start	

    var proIds = [];  //商品模块商品id
	var goodIds = [];  //促销语商品id
	var leadIds = [];  //排行榜商品id
	

    $(".shopComBox .sCom-price").each(function(){
	    var id=$(this).find("em").attr("npgoodid")
		proIds.push(id);
    });	
    
    $(".shopSellerBox .seller-price").each(function(){
	    var id=$(this).attr("npgoodid")
		leadIds.push(id);
    });	
    
    
	//促销广告语同步开始
	jQuery(".shopComBox .sCom-pro[adStatus=adDefault]").each(function(){
		var goodId=$(this).parents("li").find(".sCom-price em").attr("npgoodid");
		goodIds.push(goodId);
	});
	

         
	//价格同步end

   
	 
		getProductActAdDes(goodIds.join(","));
		//促销广告语同步结束1
	    getProductActPrice(proIds.join(","), "callbackGood"); 
	    getProductActPrice(leadIds.join(","), "callbackLead"); 

});


function callbackGood(data){
		var dataJson = eval("(" + data + ")");
		var dataPrice = dataJson.data;
		for(var id in dataPrice){   
     	     var prices = dataPrice[id];
     	     $("em[npgoodid='"+id+"']").text(prices["np"]);//获取当前价
     		 //jQuery("del[markGoodId='"+id+"']").html(prices["mp"]);//获取市场价
 	}
  } 
 
function callbackLead(data){
var dataJson = eval("(" + data + ")");
var dataPrice = dataJson.data;
for(var id in dataPrice){   
  	     var prices = dataPrice[id];
  	     $("p[npgoodid='"+id+"']").text(prices["np"]);//获取当前价
  		 //jQuery("del[markGoodId='"+id+"']").html(prices["mp"]);//获取市场价
	}
} 
function callbackAdDes(data){
	//var dataJson = eval("(" + data + ")");
	//var dataDes = dataJson.allActAdDes;
    for(var id in data){   
	     var slogan = data[id];	     
	     $("em[npgoodid='"+id+"']").parents(".sCom-price").prev().text(slogan["adDes"]);//获取最新的商品活动的广告语
	    // $("em[npgoodid='"+id+"']").parents(".sCom-price").prev().attr("title",slogan["adDes"]);//获取最新的商品活动的广告语
}

}
function getProductActAdDes(proIds) {
	if (proIds != "") {
		var act_request_url ="http://brand.jiuxian.com/selectProActInfoByGoodids.htm";
		jQuery.post(act_request_url,{proIds : proIds}, function(data){
			if (data != null) {
					callbackAdDes(data.allActAdDes)
			}
		}, "JSON")
	}
}
