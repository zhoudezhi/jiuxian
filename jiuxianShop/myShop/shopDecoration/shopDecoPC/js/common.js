// JavaScript Document
/* 
* Name: 店铺装修通用js
* Copyright: 周德志 
* Date: 2014-12-30  
*/
$(document).ready(function() {

	/*自定义编辑器常用方法start
		$("#id").val();  				//取值
		$("#id").val('<p>aaa2</p>');    //赋值
	自定义编辑器常用方法end*/
	
	/* 自定义弹窗调用方式start
		$.showAlert({
			"target":$(".pop-wrap1"),   //弹窗目标对象		
			"title":"提示",            //弹窗提示title
			"content":"操作成功",        //弹窗提示内容
			"type":"success",           //弹窗类型  成功(success)、失败(fail)、警告(alarm)、对话（confirm）     
			"cancelShow":false,          //是否显示取消按钮  默认为显示
			"callback":null				//添加回调函数    
		});
	 自定义弹窗调用方式end*/
	 
	 
	 /* 查看大图start*/ 
	 $(".bigImg").fancybox(); 
	 /* 查看大图start*/ 
	 
	 
	/* 颜色选择器调用方法start*/ 
	 colorFunction();
	 function colorFunction(){
		 $(".bgColor").ColorPicker({
				onSubmit: function(hsb, hex, rgb, el) {
					$(el).val(hex);
					$(el).ColorPickerHide();
				},
				onBeforeShow: function () {
					$(this).ColorPickerSetColor(this.value);
				}
		    })
		    .bind('keyup', function(){
			    $(this).ColorPickerSetColor(this.value);
		     });
	 }
	 
	/*颜色选择器调用方法end*/

	/* 时间控件调用方式start */ 
	$('.time').datetimepicker({
		dateFormat: "yy/mm/dd",
		timeFormat: "HH:mm:ss"                
     });
	/*时间控件调用方式end*/
	
	
	//保存页面按钮
	$(".operateBox .save").click(function(e) {
        $(".layoutBox").each(function(index, element) {
        var length = $(this).find(".modulesBox").length;
		if(length>0){
			$(this).addClass("noMargin");
		}else{
			$(this).removeClass("noMargin");
		}	
   		});	
    });

	//tab切换
	
	$(".toolList li").click(function(e) {
		if($(this).attr("haveIndex") == 0){
			$.showAlert({"type":"alarm","content":"请先填写页面信息再装修！"});
			return false;
		}
        var index = $(".toolList li").index($(this));
		$(this).addClass("on").siblings().removeClass("on");
		$(".mainEdit .tabBox").hide().eq(index).show();
    });
	
    /*拖拽函数start*/
	var dragObj={"status":false,"pagex":0,"pagey":0}
	$(".popTitle").bind({
		"mousedown":function(e){
			dragObj.pagex=e.pageX;
			dragObj.pagey=e.pageY;
			dragObj.status=true;
		},
		"mousemove":function(e){
			if(dragObj.status==true)
			{
				var left=$(this).parents(".commonPop").offset().left+e.pageX-dragObj.pagex;		
				var top=$(this).parents(".commonPop").offset().top+e.pageY-dragObj.pagey;				
				$(this).parents(".commonPop").css({"left":left,"top":top});
				dragObj.pagex=e.pageX;
				dragObj.pagey=e.pageY;
			}
		},
		"mouseup":function(e){
			dragObj.status=false;
		},
		"mouseout":function(e){
			dragObj.status=false;
		}		
	});
	/*拖拽函数end*/  

	/*layoutToolBar函数start*/
	//定位函数
	$(".layoutCon").live("mouseenter",function(){
		var layoutName = $(this).attr("layoutName");
		$(".layoutToolBar").hide();
		var width = $(this).width();
		var top=$(this).offset().top;
		var left=$(this).offset().left;
		$(".layoutToolBar").addClass("on");
		$(".layoutBox").removeClass("on");
		$(this).parent(".layoutBox").addClass("on");
		$(".layoutToolBar").css({"display":"block","top":top-40,"left":left,"width":width});
		$(".layoutToolBar").find(".layoutName").text(layoutName);	
		$(".layoutToolBar").show();
	});
	
	$(".layoutCon").live("mouseleave",function(){
		//$(".layoutBox").removeClass("on");
		$(".layoutToolBar").hide();
	});
	
	
	$(".layoutToolBar").bind({"mouseleave":function(){		
		$(this).removeClass("on").hide();
	},"mouseenter":function(){
		$(".layoutToolBar").show();
		}	
	});
	
	$(".layoutToolBar a").click(function(e) {
        var title = $(this).attr("title");
		var $target = $(".layoutBox.on");
		switch (title){
			case "设置":
			var dataString = $target.attr("data");
			if(dataString==null){
				$(".backColorPop .popForm").val("");
				$(".bgPop01,.backColorPop").show();	
			}else{
				//读取数据
				var dataString = $(".layoutBox.on").attr("data");
				var data = JSON.parse(dataString);
				$(".backColorPop").find(".bgColor").eq(0).val(data["layoutCon"]);
				$(".backColorPop").find(".bgColor").eq(1).val(data["layoutBoxColor"]);
				$(".backColorPop").find(".bgImg").val(data["layoutBoxImg"]);
				$(".bgPop01,.backColorPop").show();	
			}		
			break;
			
			case "上移":
			var $prev = $target.prev(".layoutBox");
			$target.insertBefore($prev);
			break;
			
			case "下移":
			var $next = $target.next(".layoutBox");
			$target.insertAfter($next);		
			break;
			
			case "删除":		
			$.showAlert({"type":"confirm","cancelShow":true, "content":"您确定要删除该布局吗？","callback":function(){
				$target.remove();
				$(".pop-wrap .alertCancel").hide();
			}
			});
			break;
		}		
		$(".layoutToolBar").removeClass("on").hide();
		
    });
	/*layoutToolBar函数end*/
	/*editToolBar函数start*/
	//定位
	$(".modulesBox").live("mouseenter",function(){
		var modulesName = $(this).attr("modulesName");
		var popType = $(this).attr("popType");
		var height = $(this).height();
		$(".editToolBar").hide();
		var width = $(this).width();
		var top=$(this).offset().top;
		var left=$(this).offset().left;
		$(".modulesBox").removeClass("focus");
		$(this).addClass("focus");
		$(".editToolBar").addClass("focus");		
		$(".editToolBar").css({"display":"block","top":top,"left":left,"width":width});
		$(".editToolBar").find(".toolBarBox").css({"height":height-2});
		$(".editToolBar").find(".editName").text(modulesName);
		$(".editToolBar").find(".conEdit").attr("popType",popType);
	});
	
	$(".editToolBar").bind({"mouseleave":function(){
		$(this).hide();	
		$(this).removeClass("focus");
		$(".layoutToolBar").hide();
		//$(".editToolBar,.modulesBox").removeClass("focus");	
	},"mouseenter":function(){
		var top = $(".layoutBox.on").find(".layoutCon").offset().top;
		var left = $(".layoutBox.on").find(".layoutCon").offset().left;
		$(".layoutToolBar").css({"display":"block","top":top-40,"left":left});
		}
	});
	
	$(".editToolBar .conDelete").click(function(e) {
		$.showAlert({"type":"confirm","cancelShow":true,"content":"您确定要删除该模块吗？","callback":function()
			{
				var length= $(".modulesBox.focus").siblings(".modulesBox").length;		
				if(length==0){
					$(".modulesBox.focus").after(addModules).remove();				
				}else{
					$(".modulesBox.focus").remove();
				}
				$(".editToolBar ").hide();			
			}
		});	
    });
	
	
	$(".editToolBar .addModuleBtn").click(function(e) {
		$(".bgPop01,.addModulesPop").show();
		$(".addModulesPop").attr("type","addAgain");   //区分添加模块的类别（直接添加，或后续添加）
    });
	
	
	/*editToolBar函数end*/
	
	
	//是否添加公共头部
	$("#isUserHeader,#isUserJXHeader").click(function(e) {
        var flag = $(this).attr("checked");
		if(flag=="checked"){
			$(this).parent(".commonHeader").siblings(".commonHeader").find("input").attr({"disabled":true,"checked":false});			
			$(".mainEditCon .publicHeaderBox").show();
		}else{
			$(this).parent(".commonHeader").siblings(".commonHeader").find("input").attr("disabled",false);
			$(".mainEditCon .publicHeaderBox").hide();
		}
    });
	
	
	
	/*布局弹窗start*/
	$("#insertLayout .addLayoutBtn").bind("click",function(){
		$(".bgPop01,.layoutPop").show();		
	});	
	/*布局弹窗end*/
	
	/*添加布局start*/
	$(".layoutPop li").bind("click",function(){
		$(".layoutPop li").removeClass("on");
		$(this).addClass("on");
	});
	
	
	$(".layoutPop li").bind("dblclick",function(){
		var layoutType = $(this).attr("layoutType");
		var layoutName = $(this).find(".layoutName").text();
		var $layoutBox = "";
		switch (layoutType)
		{
			case "layoutOne":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon layoutWidAuto"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutOne).attr("layoutName",layoutName);
				break;
			case "layoutOne990":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutOne990).attr("layoutName",layoutName);
				break;
			case "layoutTwo_1":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutTwo_1).attr("layoutName",layoutName);
				break;
			case "layoutTwo_2":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutTwo_2).attr("layoutName",layoutName);
				break;
			case "layoutTwo_3":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutTwo_3).attr("layoutName",layoutName);
				break;
			case "layoutTwo_4":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutTwo_4).attr("layoutName",layoutName);
				break;
			case "layoutTwo_5":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutTwo_5).attr("layoutName",layoutName);
				break;
			case "layoutThree_1":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutThree_1).attr("layoutName",layoutName);
				break;
			case "layoutThree_2":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutThree_2).attr("layoutName",layoutName);
				break;
			case "layoutThree_3":
				$layoutBox = $('<div class="layoutBox"><div class="layoutCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutThree_3).attr("layoutName",layoutName);
				break;
			case "layoutNav":
				$layoutBox = $('<div class="layoutBox layoutNav"><div class="layoutCon layoutNavCon"></div></div>');
				$layoutBox.find(".layoutCon").append(layoutNav).attr("layoutName",layoutName);
				break;
		}
		$("#layoutContain").append($layoutBox);		
		closePop01();

	});

	/*添加布局end*/ 
	
	/*添加模块start*/
	$(".addModules .addModuleBtn").live("click",function(){	
		$(this).parent().addClass("current"); //为当前模块添加标示	
		$(".bgPop01,.addModulesPop").show();		
	});
	
	$(".addModulesPop .addModulesLeft li").click(function(e) {
        var index = $(".addModulesPop .addModulesLeft li").index($(this));
		$(this).addClass("on").siblings().removeClass("on");
		$(".addModulesPop .rightBox").eq(index).show().siblings().hide();		
    });
	
	$(".addModulesPop .insertBtn").click(function(e) {
		var popType = $(this).attr("popType");
		var type = $(".addModulesPop").attr("type");
		var flag = $(this).attr("flag");
		var modulesName = $(this).attr("modulesName");
		var length = $(".addModules.current").length;
		var $msgDefaults = $(msgDefaults);
		$msgDefaults.attr({"modulesName":modulesName,"popType":popType});
		if(popType!=""){
			if(length>0){
				$(".addModules.current").after($msgDefaults).remove();	
			}else{
				$(".modulesBox.focus").after($msgDefaults);			
			}
		}else{
			if(modulesName=="店内搜索"){
				var $shopSearchBox= shopSearchBox;
				if(type=="addAgain"){  //后续添加模块
					$(".modulesBox.focus").after($msgDefaults);
					$(".modulesBox.focus").next().empty().append($shopSearchBox);
				}else{               //直接添加模块
					$(".addModules.current").after($msgDefaults);
					$(".addModules.current").next().empty().append($shopSearchBox);
					$(".addModules.current").remove();
				}
			}
			if(modulesName=="店招"){
				//读取店铺信息中的banner图片背景做完店招的图片，读取店铺url作为点击店招的跳转url
				var bannerImgPath = $("#shopBannerPath").val();
				var shopUrl = $("#shopUrl").val();
				var data = {"src":bannerImgPath,"href":shopUrl}
				var shopHeaderHtml = shopHeader.replace(/#{src}/g,data["src"]);
				shopHeaderHtml = shopHeaderHtml.replace(/#{href}/g,data["href"]);
				if(type=="addAgain"){
					$(".modulesBox.focus").after($msgDefaults);
					$(".modulesBox.focus").next().empty().append(shopHeaderHtml);
				}else{
					$(".addModules.current").after($msgDefaults);
					$(".addModules.current").next().empty().append(shopHeaderHtml);
					$(".addModules.current").remove();
				}	
			}
			if(modulesName=="店铺简介"){
				//读取店铺logo作为brandLogo，读取店铺品牌简介作为detail
				var logoImagePath = $("#shopLogoPath").val();
				var brandIntroduction = $("#shopBrandIntroduction").val();
				
				var data = {"src":logoImagePath,"detail":brandIntroduction}
				var shopInfoHtml = shopIntroduction.replace(/#{src}/g,data["src"]);
				shopInfoHtml = shopInfoHtml.replace(/#{detail}/g,data["detail"]);
				if(type=="addAgain"){
					$(".modulesBox.focus").after($msgDefaults);
					$(".modulesBox.focus").next().empty().append(shopInfoHtml);	
				}else{
					$(".addModules.current").after($msgDefaults);
					$(".addModules.current").next().empty().append(shopInfoHtml);
					$(".addModules.current").remove();	
				}			
			}		
		}
		$(".addModulesPop").removeAttr("type");
		closePop01();	
		
    });
	/*添加模块end*/ 

	/*模块弹出start*/
	$(".editToolBar .other").click(function(e) {
		// data = {"id":"","margin":""};
		var flag = $(".modulesBox.focus").find(".msgDefaults").length;
		var dataString = $(".modulesBox.focus").attr("data");
		if(dataString==null){
			$(".otherPop .moduleId").val("");
			$(".otherPop .moduleMargin").val("");
			$(".bgPop01,.otherPop").show();		
		}else{
			var data = JSON.parse(dataString);
			$(".otherPop .moduleId").val(data["id"]);
			$(".otherPop .moduleMargin").val(data["margin"]);
			$(".bgPop01,.otherPop").show();	
		}
        	
    });
	
	
	$(".editToolBar .conEdit").bind("click",function(){
		var popType = $(this).attr("popType");
		var modulesname = $(this).attr("modulesname");
		var $focus =$(".modulesBox.focus");
		var flag = $focus.find(".msgDefaults").length;
		if(popType!=""){
			switch (popType){
				case "sliderPop": //轮播
				$(".sliderPop .tableConList tbody").empty();
				$(".sliderPop .popForm").val("");
				if(flag==0){ 
					//读数据
					var dataString = $(".modulesBox.focus>div").attr("data");
					var data = JSON.parse(dataString);
					var sliderSeL = data["type"];
					if(sliderSeL=="slider_1"){
						$(".sliderPop .slider_1").attr("checked","checked")
					}else{
						$(".sliderPop .slider_2").attr("checked","checked")
					}
					$(".sliderPop .sliderHeight").val(data["sliderHeight"]);
					$(".sliderPop .sliderTime").val(data["sliderTime"]);
					
					var length = data["detail"].length;
					var i;
					for(i=0; i<length; i++){
						var tr = '<tr><td width="25%"><span class="upImgBtn"><i>选择图片</i><img href="" src="" class="sliderImg bigImg"></span></td>'+
            					 '<td width="15%"><input type="text" maxlength="6" class="popForm popForm04 bgColor"></td>'+
            					 '<td width="45%"><input type="text" value="http://" class="popForm popForm06 imgHref"></td>'+
             					 '<td width="15%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+
								 '<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';								 
						var $trThml = $(tr);
						$trThml.find(".sliderImg").attr({"href":data["detail"][i]["src"],"src":data["detail"][i]["src"]});
						$trThml.find(".bgColor").val(data["detail"][i]["bgColor"]);
						$trThml.find(".imgHref").val(data["detail"][i]["href"]);
						$(".sliderPop .tableConList tbody").append($trThml);	
						colorFunction();
					}
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				case "adversePop": //广告位
				$(".adversePop .tableConList .adverseHref").val("http://");
				$(".adversePop .tableConList .adverseImg").attr({"src":""});				
				if(flag==0){  
					//读数据
					var dataString = $(".modulesBox.focus").find(".shopFocusBox").attr("data");
					var data = JSON.parse(dataString);
					$(".adversePop .tableConList tbody").empty();
					var tr = '<tr><td width="45%"><span class="upImgBtn"><i>选择图片</i><img href="" src="" class="adverseImg bigImg"></span></td>'+                  
                			 '<td width="55%"><input type="text" value="http://" class="popForm popForm02 adverseHref"></td></tr>';
					var $trThml = $(tr);
					$trThml.find(".adverseImg").attr({"src":data["src"]});
					$trThml.find(".adverseHref").val(data["href"]);
					$(".adversePop .tableConList tbody").append($trThml);
				}
				$("."+popType).show();
				$(".bgPop01").show();				
				break;
				
				case "addNavPop": //导航
				$(".addNavPop .tableConList tbody").empty();
				if(flag==0){  
					//读数据
					var dataString = $(".modulesBox.focus").find(".shopNav").attr("data");
					var data = JSON.parse(dataString);					
					var length = data.length;
					var i;
					for(i=0; i<length; i++){
						var tr = '<tr><td width="30%"><input type="text" class="popForm popForm01" maxlength="8"></td><td width="50%"><input type="text" value="http://" class="popForm popForm02"></td>'+
                   				 '<td width="20%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a><a title="下移" href="javascript:;" class="popTabOpe moveDown"></a>'+
								 '<a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';						
						var $trHtml = $(tr);
						$trHtml.find(".popForm01").val(data[i]["name"]);
						$trHtml.find(".popForm02").val(data[i]["href"]);
						$(".addNavPop .tableConList tbody").append($trHtml);						
					}
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				case "userConPop": //自定义内容
				if(flag==0){
					var width =	$focus.find(".userDefinedBox").attr("userConWidth")	
					var dataHtml = $focus.find(".userDefinedBox").html();
					$("#xheditor_1").val(dataHtml);
					$(".userConPop .userConWidth").val(width);
				}else{
					$("#xheditor_1").val("");					
				}
				$("."+popType).show();
				$(".bgPop01").show();				
				break;
				
				case "countdownPop": //倒计时
				$(".countdownPop .popForm").val("");
				if(flag==0){
					//读数据
					var dataString = $(".modulesBox.focus").find(".shopCountdown").attr("data");
					var data = JSON.parse(dataString); 						
					$(".countdownPop .timeStart").val(data["timeStart"]);
					$(".countdownPop .timeEnd").val(data["timeEnd"]);
					$(".countdownPop .bgColor").val(data["bgColor"]);
				}
				$("."+popType).show();
				$(".bgPop01").show();				
				break;
				
				case "goodsPop": //商品
				$(".goodsPop .tableConList tbody").empty();
				if(flag ==0){  
					//读数据
					var dataString = $(".modulesBox.focus").find(".shopComBox").attr("data");
					var data = JSON.parse(dataString); 	
					var length = data.length;
					var i;
					for(i=0; i<length; i++){
				var tr = '<tr><td width="13%" class="goodId">1234569</td><td width="22%"><div class="goodInfoBox">'+
				'<em title="" class="goodTitle"></em><input type="text" placeholder="自定义商品名称" class="popForm popForm01 userGoodTitle"></div></td>'+                 
				'<td width="20%"><div class="goodInfoBox"><em class="slogan"></em><input type="text" placeholder="自定义广告语" class="popForm popForm01 userSlogan"></div></td>'+       
				'<td width="15%"><select class="tabSel promotion"><option index="0" value="48px 48px">请选择</option><option index="1" value="0px 0px">直降</option><option index="2" value="-47px 0px">会员有惊喜</option>	<option index="3" value="-94px 0px">高性价</option>'+
				'<option index="4" value="-141px 0px">疯抢</option><option index="5" value="-188px 0px">限量</option><option index="6" value="-235px 0px">满200返200</option><option index="7" value="0px -54px">AOC</option><option index="8" value="-47px -54px">返20值减</option><option index="9" value="-94px -54px">爆款</option><option index="10" value="-141px -54px">特价</option>'+
				'<option index="11" value="-188px -54px">赠品</option><option index="12" value="-235px -54px">秒杀</option><option index="13" value="0 -108px;">获奖</option><option index="14" value="-47px -108px">双12专享</option><option index="15" value="-94px -108px">加价购</option>'+
				'<option index="16" value="-141px -108px">清仓特卖</option><option index="17" value="-188px -108px">送礼</option><option index="18" value="-235px -108px">买一赠一</option><option index="19" value="0 -162px">满立减</option><option index="20" value="-47px -162px">本季爆款</option><option index="21" value="-94px -162px">满就送</option><option index="22" value="-141px -162px">双12提前抢</option>'+
				'<option index="23" value="-188px -162px">买立减</option><option index="24" value="-235px -162px">倒计时72小时</option><option index="25" value="0px -216px">送大坛</option><option index="26" value="-48px -216px">买一赠二</option><option index="27" value="-95px -216px">日销千瓶</option>'+
				'<option index="28" value="-142px -216px">酒友推荐</option><option index="29" value="-189px -216px">包邮</option><option index="30" value="-236px -216px">返券</option></select></td>'+
				'<td width="10%" class="goodPrice">199</td><input type="hidden" value="src" class="imgSrc"><input type="hidden" value="href" class="imgHref"><input type="hidden" class="npgoodId" value="npgoodId" />  '+
				'<td width="20%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+
				'<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
						var $trHtml = $(tr);
						$trHtml.find(".goodId").text(data[i]["id"]);
						$trHtml.find(".goodTitle").text(data[i]["title"]).attr("title",data[i]["title"]);
						$trHtml.find(".userGoodTitle").val(data[i]["userTitle"]);
						$trHtml.find(".slogan").text(data[i]["slogan"]);
						$trHtml.find(".userSlogan").val(data[i]["userSlogan"]);
						$trHtml.find(".goodPrice").text(data[i]["goodPrice"]);
						$trHtml.find(".promotion").val(data[i]["promotion"]);
						$trHtml.find(".promotion").get(0).selectedIndex = parseInt(data[i]["promotionIndex"]);
						$trHtml.find(".imgSrc").val(data[i]["src"]);
						$trHtml.find(".imgHref").val(data[i]["href"]);
						$trHtml.find(".npgoodId").val(data[i]["npgoodId"]);
						$(".goodsPop .tableConList tbody").append($trHtml);
					}

				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				case "couponPop": //优惠券				
				$(".couponPop .tableConList tbody").empty();
				$(".couponPop .activeId").val("");
				if(flag==0){  
					//读数据
					var dataString = $(".modulesBox.focus").find(".shopCouponBox").attr("data");
					var data = JSON.parse(dataString); 						
					$(".couponPop .activeId").val(data["activeid"]);
					var length = data["detail"].length;
					var i;	
					for(i=0; i<length; i++){
						var tr = '<tr><td width="35%"><span class="upImgBtn"><i>选择图片</i><img href="" src="" class="couponImg bigImg"></span></td>'+
            					 '<td width="35%"><input type="text" class="popForm popForm04 couponId"></td><td width="30%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a>'+
								 '<a class="popTabOpe moveDown" href="javascript:;" title="下移"></a><a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
						var $trHtml = $(tr);
						$trHtml.find(".couponImg").attr({"href":data["detail"][i]["src"],"src":data["detail"][i]["src"]});
						$trHtml.find(".couponId").val(data["detail"][i]["couponid"]);
						$(".couponPop .tableConList tbody").append($trHtml);
					}
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				
				case "shopNoticePop": //店铺公告
				$(".shopNoticePop").find(".noticeDetail").val("");
				if(flag==0){
					var detail =  $focus.find(".detail").html(); 
					$(".shopNoticePop").find(".noticeDetail").val(detail);
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;

				case "leaderboardPop": //排行榜
				$(".leaderboardPop .tableConList tbody").empty();
				$(".leaderboardPop .boardTitle").val("");
				if(flag==0){
					//读数据
					//data = {"title":"","goods":[]};   dataUnit = {"id":"","title":"","price":"","src":"","href":""};					
					var dataString = $(".modulesBox.focus").find(".shopSellerBox").attr("data");
					var data = JSON.parse(dataString); 	
					$(".leaderboardPop .tableConList tbody").empty();
					$(".leaderboardPop .boardTitle").val(data["title"]);
					var i;
					var length = data["goods"].length;
					for(i=0; i<length; i++){
						var tr = '<tr><td width="20%" class="goodId"></td><td width="35%"><em title="" class="goodTitle"></em></td>'+                     
           						 '<td width="15%" class="goodPrice"></td><input type="hidden" value="src" class="imgSrc"><input type="hidden" value="href" class="imgHref"><input type="hidden" value="npgoodId" class="npgoodId">'+
           						 '<td width="30%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+
								 '<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
						var $trHtml = $(tr);
						$trHtml.find(".goodId").text(data["goods"][i]["id"]);
						$trHtml.find(".goodTitle").text(data["goods"][i]["title"]).attr("title",data["goods"][i]["title"]);
						$trHtml.find(".goodPrice").text(data["goods"][i]["price"]);
						$trHtml.find(".imgSrc").text(data["goods"][i]["src"]);
						$trHtml.find(".imgHref").text(data["goods"][i]["href"]);
						$trHtml.find(".npgoodId").text(data["goods"][i]["npgoodId"]);
						$(".leaderboardPop .tableConList tbody").append($trHtml);
					}
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				case "classifyPop": //商品分类
				$(".classifyPop .tableConList tbody").empty();
				$(".classifyPop .tableConList .popForm").val("");
				if(flag==0){
					//读数据 data = [];  dataUnit = {"title":"","detail":{"secondName":[],"href":[]}};
					var dataString = $(".modulesBox.focus").find(".shopComFilter").attr("data");
					var data = JSON.parse(dataString);
					
					var length= data.length;
					var i;
					var j;
					for(i=0; i<length; i++){
						var tr = '<tr class="firstClassify"><td width="30%"><input type="text" class="popForm popForm01"></td><td width="40%"><div class="btnBox">'+
								 '<a class="popBut04 addSecond" href="javascript:;">添加子分类</a></div></td><td width="25%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a>'+
								 '<a title="下移" href="javascript:;" class="popTabOpe moveDown"></a><a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';	
						var $trHtml = $(tr);
						$trHtml.find(".popForm").val(data[i]["title"]);
						$(".classifyPop .tableConList tbody").eq(0).append($trHtml);						
						var slength = data[i]["detail"]["secondName"].length;
						if(slength>0){
							var newTable = '<tr class="secondClassify"><td colspan="3"><table><tbody></tbody></table></td></tr>';
							$(".classifyPop .tableConList tbody").eq(0).append(newTable);
						}
						for(j=0; j<slength; j++){
							var str = '<tr><td width="35%"><div class="secondBox"><span>子分类：</span><input type="text" value="" class="popForm popForm01">'+
					  		'</div></td><td width="45%"><span>链接：</span><input type="text" value="" class="popForm popForm02"></td><td width="20%"><a class="subOpe moveUp" href="javascript:;" title="上移">'+
					   		'</a><a class="subOpe moveDown" href="javascript:;" title="下移"></a><a class="subOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
							 var $strHtml = $(str);
							 $strHtml.find(".popForm01").val(data[i]["detail"]["secondName"][j]);
							 $strHtml.find(".popForm02").val(data[i]["detail"]["href"][j]);
							 $(".classifyPop .tableConList tbody:last").append($strHtml);	
						} 
					}
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;
				
				case "anchorNavPop": //侧导航
				$(".anchorNavPop .tableConList tbody").empty();
				$(".anchorNavPop .popForm").val("");
				if(flag==0){
					//读数据 data ={"imgHeight":"","imgWidth":"","marginTop":"","src":"","detail":[]}; dataUnit = {"href":"","height":""};
					var dataString = $(".modulesBox.focus").find(".shopSidesNavBox").attr("data");
					var data = JSON.parse(dataString);
					var isFirstShow = data["isFirstShow"];
					var showLocation = data["showLocation"];
					$(".anchorNavPop .isFirstShow").get(0).selectedIndex = (parseInt(isFirstShow)-1);
					$(".anchorNavPop .showLocation").get(0).selectedIndex = (parseInt(showLocation)-1);
					
					$(".anchorNavPop .anchorImg").val(data["src"]);
					$(".anchorNavPop .imgHeight").val(data["imgHeight"]);
					$(".anchorNavPop .imgWidth").val(data["imgWidth"]);
					$(".anchorNavPop .marginTop").val(data["marginTop"]);
					$(".anchorNavPop .heightToTop").val(data["heightToTop"]);
					
					var length = data["detail"].length;
					var i;
					for(i=0; i<length; i++){
						var tr = '<tr><td width="15%"><input type="text" value="#" class="popForm popForm04"></td><td width="15%"><input type="text" class="popForm popForm04">像素</td>'+  
            					 '<td width="20%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a><a title="下移" href="javascript:;" class="popTabOpe moveDown"></a>'+ 
								 '<a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';
						var $trHtml = $(tr);
						$trHtml.find(".popForm").eq(0).val(data["detail"][i]["href"]);
						$trHtml.find(".popForm").eq(1).val(data["detail"][i]["height"]);
						$(".anchorNavPop .tableConList tbody").append($trHtml);
					}	
				}
				$("."+popType).show();
				$(".bgPop01").show();
				break;	
			}
		}else{
			return false;		
		}
	});	
	/*模块弹出end*/
	
	
	
	/*弹窗共用start*/
	$(".commonPop .tableConList .popTabOpe").live("click",function(){
		var flag = $(this).parents(".classifyPop").length;  //商品分类不执行此处
		if(flag>0){
			return false;
		}
		var title = $(this).attr("title");
		var $parents = $(this).parents("tr");
		switch (title){
			case "删除":
			$parents.remove();		
			break;
						
			case "上移":
			var $prev = $parents.prev();
			$parents.insertBefore($prev);
			break;			
			
			case "下移":
			var $prev = $parents.next();
			$parents.insertAfter($prev);			
			break;
		}
	});
	
	$(".firstPop .cancelBtn,.firstPop .popClose").click(function(e) {
        closePop01();		
    });
	
	$(".secondPop .cancelBtn,.secondPop .popClose").click(function(e) {
        closePop02();		
    });
	
	function closePop01(){
		$(".bgPop01").hide();
		$(".firstPop").hide();
		$(".addModulesPop").removeAttr("type");
		$(".addModules").removeClass("current");  //去除所有标示
	}
	
	function closePop02(){
		$(".bgPop02").hide();
		$(".secondPop").hide();
		$(".addModules").removeClass("current");  //去除所有标示
	}
	
	$(".commonPop .allCheck").click(function(e) {   //全选
		var value = $(this).attr("checked");
		var $parents = $(this).parents(".commonPop");
        if(value=="checked"){
			$parents.find(".tableConList tr").find("input:checkbox").attr("checked","checked");
		}else{
			$parents.find(".tableConList tr").find("input:checkbox").attr("checked",false);
		}
    });
	/*弹窗共用end*/
	
	/*导航start*/
	$(".addNavPop .addNavBtn").click(function(e) {
		var index = $(".addNavPop .tableConList tbody").find("tr").length;
		if(index>6){
			$.showAlert({"type":"alarm","content":"导航数目最多增加7个"});
			return false;			
		}
        var newTr = '<tr><td width="30%"><input class="popForm popForm01" type="text" maxlength="8" /></td><td width="50%"><input class="popForm popForm02" type="text" value="http://" /></td>'+
                    '<td width="20%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+
					'<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
		$(".addNavPop .tableConList tbody").append(newTr);	
		
    });
	
	// 导航
	$(".addNavPop .saveBtn").click(function(e) {
		var flag = true;
		var data = [];		
		$(".addNavPop .tableConList tr").each(function(index) {
			var dataUnit = {"name":"","href":""};
			var name = $.trim($(this).find(".popForm").eq(0).val());
			var href = $.trim($(this).find(".popForm").eq(1).val());
			if(name==""||href.indexOf("jiuxian")<0){
				flag = false;	
			}else{
				dataUnit["name"] = name;
				dataUnit["href"] = href;
			}
			data.push(dataUnit);
		 });
		if(!flag){
			$.showAlert({"type":"alarm","content":"请输入导航名称和内部链接"});
		}else{
			$(".modulesBox.focus").empty().append(shopNav);
			var length = data.length;
			var i;
			for(i=0; i<length; i++){
				var shopNavLiHtml = shopNavLi.replace(/#{navName}/g,data[i]["name"]);
				shopNavLiHtml = shopNavLiHtml.replace(/#{href}/g,data[i]["href"]);
				$(".modulesBox.focus").find("ul").append(shopNavLiHtml);			
			}	
			
			var dataString = JSON.stringify(data);
			$(".modulesBox.focus").find(".shopNav").attr("data",dataString);
			closePop01();	
		}
        
		//alert(data[0])	
	});
	/*导航end*/
	
	/*图片轮播start*/
	$(".sliderPop .addSliderBtn").click(function(e) {
        var newTr =  '<tr><td width="25%"><span class="upImgBtn"><i>选择图片</i><img  class="sliderImg bigImg" src="" href=""/></span></td>'+
            '<td width="15%"><input type="text" class="popForm popForm04 bgColor" maxlength="6"></td><td width="45%"><input type="text" class="popForm popForm06 imgHref" value="http://"></td>'+
            '<td width="15%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a><a title="下移" href="javascript:;" class="popTabOpe moveDown"></a>'+
			'<a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';
		$(".sliderPop .tableConList tbody").append(newTr);	
		colorFunction();
    });

	// 插入轮播
	$(".sliderPop .saveBtn").click(function(e) {
		var flag = true;
		var data = {"type":"","sliderHeight":"","sliderTime":"","detail":[]};
		var sliderBox;
		var sliderLi;
		var status = $(".sliderPop .slider_1").attr("checked");
		
		if(status=="checked"){
			sliderBox = sliderBox_1;
			sliderLi = sliderLi_1;
			data["type"] = "slider_1";
			
		}else{
			sliderBox = sliderBox_2;
			sliderLi = sliderLi_2;	
			data["type"] = "slider_2";
		}
		var sliderHeight = $.trim($(".sliderPop .sliderHeight").val());
		var sliderTime = $.trim($(".sliderPop .sliderTime").val());
		if(sliderHeight==""||sliderTime==""){
			flag = false;	
		}else{
			data["sliderHeight"] = sliderHeight;
			data["sliderTime"] = sliderTime;
		}
		$(".sliderPop .tableConList tr").each(function(index) {
			var dataUnit = {"src":"","href":"","bgColor":""};
			var src = $(this).find(".sliderImg").attr("src");
			var bgColor = $.trim($(this).find(".bgColor").val());
			var href = $.trim($(this).find(".imgHref").val());
			if(src==""||href.indexOf("jiuxian")<0){
				flag = false;
			}else{
				dataUnit["src"] = src;
				dataUnit["bgColor"] = bgColor;
				dataUnit["href"] = href;	
			}
            data["detail"].push(dataUnit);
        });

		if(!flag){
			$.showAlert({"type":"alarm","content":"请输入轮播参数和内部链接"});
		}else{
			$(".modulesBox.focus").empty().append(sliderBox);
			var i;
			var length = data["detail"].length;
			for(i=0; i<length; i++)
			{		
				var sliderLiHtml = sliderLi.replace(/#{src}/g,data["detail"][i]["src"]);
				if(data["detail"][i]["bgColor"]==""){
					sliderLiHtml = sliderLiHtml.replace(/#{color}/g,"fff");
				}else{
					sliderLiHtml = sliderLiHtml.replace(/#{color}/g,data["detail"][i]["bgColor"]);
				}				
				sliderLiHtml = sliderLiHtml.replace(/#{href}/g,data["detail"][i]["href"]);
				$(".modulesBox.focus").find(".bigUl").append(sliderLiHtml);
				$(".modulesBox.focus").find(".smallUl").append("<li>"+(i+1)+"</li>");
			}
			//$(".modulesBox.focus").find(".bigUl li:first").addClass("on");
			$(".modulesBox.focus").find(".smallUl li:first").addClass("on");
			$(".modulesBox.focus").attr("sliderTime",data["sliderTime"]);	
			$(".modulesBox.focus").find(".mainBanner .imgBox li,.mainBanner,.floorSlider .imgBox li,.floorSlider").css({"height":sliderHeight});
			var dataString = JSON.stringify(data);
			$(".modulesBox.focus>div").attr("data",dataString);
			$(".modulesBox.focus>div").attr("sliderTime",sliderTime);
			closePop01();	
		}
    });
	
	/*图片轮播end*/
	
	
	/*优惠券start*/
	$(".couponPop .addCouponBtn").click(function(e) {
        var newTr =  '<tr><td width="35%"><span class="upImgBtn"><i>选择图片</i><img  class="couponImg bigImg" src="" href="" /></td>'+
            		 '<td width="35%"><input type="text" class="popForm popForm04 couponId"></td><td width="30%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a>'+
					 '<a title="下移" href="javascript:;" class="popTabOpe moveDown"></a><a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';
		$(".couponPop .tableConList tbody").append(newTr);	
    });
	
	$(".couponPop .saveBtn").click(function(e) {	
		var data = {"activeid":"","detail":[]};
		var flag = true;
		var activeid = $.trim($(".couponPop .activeId").val());
		if(activeid==""){
			flag = false;
		}else{
			data["activeid"] = activeid
		}
		
		$(".couponPop .tableConList tr").each(function() {
			var dataUnit = {"src":"","couponid":""}
            var src = $(this).find(".couponImg").attr("src");
			var couponid = $.trim($(this).find(".couponId").val());
			if(src==""||couponid==""){
				flag = false;
			}else{
				dataUnit["src"] = src;
				dataUnit["couponid"] = couponid;
			}
			data["detail"].push(dataUnit);	
        });
		
		if(!flag){
			$.showAlert({"type":"alarm","content":"请输入优惠券参数"});
		}else{
			var i;		
			var length = data["detail"].length;
			var shopCouponBoxHtml = shopCouponBox;
			$(".modulesBox.focus").empty().append(shopCouponBoxHtml);
			for(i=0; i<length; i++){
				var shopCouponBoxLiHtml = shopCouponBoxLi;
				shopCouponBoxLiHtml = shopCouponBoxLiHtml.replace(/#{activeid}/g,data["activeid"]);
				shopCouponBoxLiHtml = shopCouponBoxLiHtml.replace(/#{couponid}/g,data["detail"][i]["couponid"]);
				shopCouponBoxLiHtml = shopCouponBoxLiHtml.replace(/#{src}/g,data["detail"][i]["src"]);		
				$(".modulesBox.focus").find(".shopCouponBox").append(shopCouponBoxLiHtml);
			}
			var dataString = JSON.stringify(data);
			$(".modulesBox.focus").find(".shopCouponBox").attr("data",dataString);
			closePop01();
		}
    });
	/*优惠券end*/
	
	
	/*广告位start*/
	$(".adversePop .saveBtn").click(function(e) {
		var data = {"src":"","href":""}
		var href = $.trim($(".adversePop .adverseHref").val());
		var src = $(".adversePop .adverseImg").attr("src");
		if(href.indexOf("jiuxian")<0||src==""){
			$.showAlert({"type":"alarm","content":"请输入广告位参数和内部链接"});
		}else{
			data["href"] = href;
			data["src"] = src;
			var adverseHtml = shopFocusBox.replace(/#{src}/g,data["src"]);
			adverseHtml = adverseHtml.replace(/#{href}/g,data["href"]);
			$(".modulesBox.focus").empty().append(adverseHtml);	
			var dataString = JSON.stringify(data);	
			$(".modulesBox.focus").find(".shopFocusBox").attr("data",dataString);
			closePop01();
		}
    });	
	/*广告位end*/
	
	/*自定义start*/
	$(".userConPop .userOpenFile").click(function(e) {
        var value = $(this).text();
		if(value=="展开文件选择器"){
			$(this).text("关闭文件选择器")
		var firstLevel = -1;
		var secondLevel = -1;
		var imageName = "";
		var $imageList=$(".userConPop .popConItem").eq(0);
		jQuery.ajax({
			  type:"post",
			  url:"/shop/imageListAjax.htm",
			  data:{ 'firstLevel':firstLevel,'secondLevel':secondLevel,'imageName':imageName,'pageSize':6,'pageNum':1},
			  dataType:"html",
			  cache:false,
			  async:false,
			  success:function(data){
				  if(data.status == 9){
					  $.showAlert({"type":"alarm","content":"登录信息失效，请重新登陆",callback:function(){
							 window.location.href = "http://login.jiuxian.com"
							 }});
				    }
			  $imageList.empty();
			  $imageList.html(data);
			  var selectcontent = $("#firstLevelUserConPopSelect").html();
			  if(selectcontent.indexOf("全部")>0){
				  selectcontent = selectcontent.replace("全部","请选择");
			  }
			  $("#firstLevelUserConPop").empty();
			  $("#firstLevelUserConPop").html(selectcontent);
			  },
		  });
			
			
			$(".userConPop .fileChooserBox").show();			
		}else{
			$(this).text("展开文件选择器");
			$(".userConPop .fileChooserBox").hide();	
		}
    });
	
	$(".userConPop .saveBtn").click(function(e) {
		var width = $.trim($(".userConPop .userConWidth").val());
        var data = $("#xheditor_1").val(); 
		var userDefinedBoxHtml = userDefinedBox;
		$(".modulesBox.focus").empty().append(userDefinedBoxHtml);
		$(".modulesBox.focus").find(".userDefinedBox").append(data).attr({"userConWidth":width});	
		closePop01();
    });
	
	$(".userConPop .popPicList li").live("click",function(e) {
        var src = $(this).find("img").attr("src");
		var data = $("#xheditor_1").val();  
		var img = "<img src='"+src+"' alt='' />";
		data = data+img
		$("#xheditor_1").val(data); 
    });
	/*自定义end*/
	
	
	/*倒计时start*/
	$(".countdownPop .saveBtn").click(function(e) {
		var data = {"status":"","timeStart":"","timeEnd":"","bgColor":""};
		var status = $(".countdownPop input[name=actionChoose]:checked").val();
		var timeEnd = $.trim($(".countdownPop .timeEnd").val());
		var timeStart = $.trim($(".countdownPop .timeStart").val());
		var bgColor = $.trim($(".countdownPop .bgColor").val());			
		if(timeEnd==""||timeStart==""){
			$.showAlert({"type":"alarm","content":"请输入倒计时时间"});
			return false;
		}else{
			data["status"] = status;
			data["timeStart"] = timeStart;
			data["timeEnd"] = timeEnd;
			data["bgColor"] = bgColor;
			var $shopCountdownHtml = $(shopCountdown);
			if(data["status"]==0){
				$shopCountdownHtml.find(".title").text("距离活动结束还有");
			}else if(data["status"]==1){
				$shopCountdownHtml.find(".title").text("距离活动开始还有");
			}
			if(data["bgColor"]!=""){
				$shopCountdownHtml.css({"background":"#"+data["bgColor"]});
			}
			$(".modulesBox.focus").empty().append($shopCountdownHtml);
			var dataString = JSON.stringify(data);	
			$(".modulesBox.focus").find(".shopCountdown").attr("data",dataString);	
			closePop01();
		}
    });
	/*倒计时end*/
	
	/*商品start*/
	$(".goodsPop .btnBox").eq(0).find("a").bind("click",function(e) {
		if($(this).hasClass("choseInput")){				// 录入商品
			$(".choseInputPop .tableConList tbody").empty();
			$(".choseInputPop").show().attr("goodType","goodsPop");
			$(".bgPop02").show();	
		}		
		if($(this).hasClass("deleteGoods")){ //删除商品
			$(".goodsPop .tableConList tr").find("input:checked").each(function() {
                $(this).parents("tr").remove();
            });
		}
    });
	
	$(".goodsPop .saveBtn").click(function(e) {
		var data = [];
		$(".goodsPop .tableConList tr").each(function() {
            var dataUnit = {"id":"","userTitle":"","title":"","userSlogan":"","slogan":"","goodPrice":"","promotionIndex":"","promotion":"","src":"","href":"","npgoodId":""};
			dataUnit["id"] = $(this).find(".goodId").text();
			dataUnit["userTitle"] = $(this).find(".userGoodTitle").val();
			dataUnit["title"] = $(this).find(".goodTitle").text();
			dataUnit["userSlogan"] = $(this).find(".userSlogan").val();
			dataUnit["slogan"] = $(this).find(".slogan").text();
			dataUnit["goodPrice"] = $(this).find(".goodPrice").text();
			dataUnit["promotionIndex"] = $(this).find(".promotion").find("option:selected").attr("index");
			dataUnit["promotion"] = $(this).find(".promotion").val();
			dataUnit["src"] = $(this).find(".imgSrc").val();
			dataUnit["href"] = $(this).find(".imgHref").val();
			dataUnit["npgoodId"] = $(this).find(".npgoodId").val();
			data.push(dataUnit);
        });
		
		var length = data.length;
		var i = 0;		
		var shopComBoxHtml = shopComBox;
		$(".modulesBox.focus").empty().append(shopComBoxHtml);
		for(i=0; i<length; i++){
			var shopComBoxLiHtml = shopComBoxLi;			
			var title = (data[i]["userTitle"]!="")?data[i]["userTitle"]:data[i]["title"];
			var slogan = (data[i]["userSlogan"]!="")?data[i]["userSlogan"]:data[i]["slogan"];
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{src}/g,data[i]["src"]);
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{href}/g,data[i]["href"]);
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{price}/g,data[i]["goodPrice"]);
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{slogan}/g,slogan);
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{title}/g,title);	
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{position}/g,data[i]["promotion"]);	
			shopComBoxLiHtml = shopComBoxLiHtml.replace(/#{npgoodId}/g,data[i]["npgoodId"]);
			var $shopComBoxLiHtml = $(shopComBoxLiHtml);
			if(data[i]["userSlogan"]==""){
				$shopComBoxLiHtml.find(".sCom-pro").attr("adStatus","adDefault");
			}	
			$(".modulesBox.focus").find("ul").append($shopComBoxLiHtml);
		}
		var dataString = JSON.stringify(data);	
		$(".modulesBox.focus").find(".shopComBox").attr("data",dataString);
		closePop01();
    });
	/*商品end*/
	
	
	/*排行榜start*/
	$(".leaderboardPop .btnBox").eq(0).find("a").bind("click",function(e) {
		if($(this).hasClass("choseInput")){				// 录入商品
			$(".choseInputPop").show().attr("goodType","leaderboardPop");
			$(".bgPop02").show();	
		}		
		if($(this).hasClass("deleteGoods")){ //删除商品
			$(".leaderboardPop .tableConList tr").find("input:checked").each(function() {
                $(this).parents("tr").remove();
            });
		}
    });
	
	$(".leaderboardPop .saveBtn").click(function(e) {
		var data = {"title":"","goods":[]}; 
		data["title"] = $.trim($(".leaderboardPop .boardTitle").val());
		$(".leaderboardPop .tableConList tr").each(function() {
			var dataUnit = {"id":"","title":"","price":"","src":"","href":"","npgoodId":""};
			dataUnit["id"] = $(this).find(".goodId").text();
			dataUnit["title"] = $(this).find(".goodTitle").text();
			dataUnit["price"] = $(this).find(".goodPrice").text();
			dataUnit["src"] = $(this).find(".imgSrc").val();
			dataUnit["href"] = $(this).find(".imgHref").val();
			dataUnit["npgoodId"] = $(this).find(".npgoodId").val();
			data["goods"].push(dataUnit);
		});
		
		
		if(data["title"]==""){
			$.showAlert({"type":"alarm","content":"请输入排行榜标题"});
			return false;
		}else{
			var length = data["goods"].length;
			var i = 0;
			var shopSellerBoxHtml = shopSellerBox;
			$(".modulesBox.focus").empty().append(shopSellerBoxHtml);
			$(".modulesBox.focus").find(".shopDefaultTit").text(data["title"]);
			for(i=0; i<length; i++){
				var shopSellerBoxLiHtml = shopSellerBoxLi;
				shopSellerBoxLiHtml = shopSellerBoxLiHtml.replace(/#{src}/g,data["goods"][i]["src"]);
				shopSellerBoxLiHtml = shopSellerBoxLiHtml.replace(/#{href}/g,data["goods"][i]["href"]);
				shopSellerBoxLiHtml = shopSellerBoxLiHtml.replace(/#{price}/g,data["goods"][i]["price"]);
				shopSellerBoxLiHtml = shopSellerBoxLiHtml.replace(/#{title}/g,data["goods"][i]["title"]);
				shopSellerBoxLiHtml = shopSellerBoxLiHtml.replace(/#{npgoodId}/g,data["goods"][i]["npgoodId"]);	
				$(".modulesBox.focus").find("ul").append(shopSellerBoxLiHtml);
			}
			var dataString = JSON.stringify(data);	
			$(".modulesBox.focus").find(".shopSellerBox").attr("data",dataString);
			closePop01();
		}
    });
	
	/*排行榜end*/
	
	/*商品录入start*/
	//全选
	$(".choseInputPop .allCheck").live('click',function(e) {
        var status = $(this).attr("checked");
		if(status=="checked"){
			$(".choseInputPop .tableConList input:checkbox").attr("checked","checked");
		}else{
			$(".choseInputPop .tableConList input:checkbox").attr("checked",false);
		}
    });
	$(".choseInputPop .saveBtn").click(function(e) {
		var goodType = $(this).parents(".commonPop").attr("goodType");		
        $(".choseInputPop .tableConList tr input:checked").each(function() {
			var tr = "";
			if(goodType=="goodsPop"){  //商品模块
				tr = '<tr><td width="13%" class="goodId">1234569</td><td width="22%"><div class="goodInfoBox">'+
				'<em title="" class="goodTitle"></em><input type="text" placeholder="自定义商品名称" class="popForm popForm01 userGoodTitle"></div></td>'+                 
				'<td width="20%"><div class="goodInfoBox"><em class="slogan"></em><input type="text" placeholder="自定义广告语" class="popForm popForm01 userSlogan"></div></td>'+       
				'<td width="15%"><select class="tabSel promotion"><option index="0" value="48px 48px">请选择</option><option index="1" value="0px 0px">直降</option><option index="2" value="-47px 0px">会员有惊喜</option>	<option index="3" value="-94px 0px">高性价</option>'+
				'<option index="4" value="-141px 0px">疯抢</option><option index="5" value="-188px 0px">限量</option><option index="6" value="-235px 0px">满200返200</option><option index="7" value="0px -54px">AOC</option><option index="8" value="-47px -54px">返20值减</option><option index="9" value="-94px -54px">爆款</option><option index="10" value="-141px -54px">特价</option>'+
				'<option index="11" value="-188px -54px">赠品</option><option index="12" value="-235px -54px">秒杀</option><option index="13" value="0 -108px;">获奖</option><option index="14" value="-47px -108px">双12专享</option><option index="15" value="-94px -108px">加价购</option>'+
				'<option index="16" value="-141px -108px">清仓特卖</option><option index="17" value="-188px -108px">送礼</option><option index="18" value="-235px -108px">买一赠一</option><option index="19" value="0 -162px">满立减</option><option index="20" value="-47px -162px">本季爆款</option><option index="21" value="-94px -162px">满就送</option><option index="22" value="-141px -162px">双12提前抢</option>'+
				'<option index="23" value="-188px -162px">买立减</option><option index="24" value="-235px -162px">倒计时72小时</option><option index="25" value="0px -216px">送大坛</option><option index="26" value="-48px -216px">买一赠二</option><option index="27" value="-95px -216px">日销千瓶</option>'+
				'<option index="28" value="-142px -216px">酒友推荐</option><option index="29" value="-189px -216px">包邮</option><option index="30" value="-236px -216px">返券</option></select></td>'+
				'<td width="10%" class="goodPrice">199</td><input type="hidden" value="src" class="imgSrc"><input type="hidden" value="href" class="imgHref"><input type="hidden" class="npgoodId" value="npgoodId" />  '+
				'<td width="20%"><a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+
				'<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
			}else{    //排行榜模块
				tr = '<tr><td width="20%" class="goodId">1234569</td><td width="35%"><em title="53°飞天茅台" class="goodTitle">53°飞天茅台</em></td>'+                   
           			 '<td width="15%" class="goodPrice">199</td><input type="hidden" value="src" class="imgSrc"><input type="hidden" value="href" class="imgHref"><input type="hidden" class="npgoodId" value="npgoodId" /><td width="30%">'+   
					 '<a class="popTabOpe moveUp" href="javascript:;" title="上移"></a><a class="popTabOpe moveDown" href="javascript:;" title="下移"></a>'+   
					 '<a class="popTabOpe conDelete" href="javascript:;" title="删除"></a></td></tr>'; 	
			}
			$this = $(this).parents("tr");
			var $tr = $(tr);
			$tr.find(".goodId").text($this.find(".goodId").text());
			$tr.find(".goodTitle").text($this.find(".goodTitle").text());
			$tr.find(".goodPrice").text($this.find(".goodPrice").text());
			$tr.find(".imgHref").val($this.find(".imgHref").val());
			$tr.find(".imgSrc").val($this.find(".imgSrc").val());
			$tr.find(".npgoodId").val($this.find(".npgoodId").val());
			$tr.find(".slogan").text($this.find(".slogan").text());
			$("."+goodType).find(".tableConList tbody").append($tr);
			
        });
		closePop02();
    });
	/*商品录入end*/
	
	
	/*店铺公告start*/
	$(".shopNoticePop .saveBtn").click(function(e) {
        var detail = $.trim($(".shopNoticePop .noticeDetail").val());
		var shopNoticeBoxHtml = shopNoticeBox.replace(/#{detail}/g,detail);
		$(".modulesBox.focus").empty().append(shopNoticeBoxHtml);
		closePop01();
    });
	/*店铺公告end*/
	
	
	/*商品分类start*/
	$(".classifyPop .tableConList .popTabOpe").live("click",function(){
		var title = $(this).attr("title");
		var $firstClassify = $(this).parents("tr.firstClassify");
		var $secondClassify = $firstClassify.next(".secondClassify");
		var $target = $firstClassify.add($secondClassify)
		switch (title){
			case "删除":
			$target.remove();	
			break;
						
			case "上移":
			var $prev = $firstClassify.prev().prev(".firstClassify");
			$target.insertBefore($prev);
			break;			
			
			case "下移":
			var $next = $secondClassify.next().next(".secondClassify");
			$target.insertAfter($next);			
			break;
		}
	});
	
	$(".classifyPop .tableConList .subOpe").live("click",function(){
		var title = $(this).attr("title");
		var $parents = $(this).parent().parent("tr");
		switch (title){
			case "删除":
			$parents.remove();		
			break;
						
			case "上移":
			var $prev = $parents.prev();
			$parents.insertBefore($prev);
			break;			
			
			case "下移":
			var $next = $parents.next();
			$parents.insertAfter($next);			
			break;
		}
	});
	
	
	
	$(".classifyPop .addClassify").click(function(e) {
        var newTr = '<tr class="firstClassify"><td width="30%"><input type="text" class="popForm popForm01"></td><td width="40%"><div class="btnBox">'+
					'<a class="popBut04 addSecond" href="javascript:;">添加子分类</a></div></td><td width="25%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a>'+
					'<a title="下移" href="javascript:;" class="popTabOpe moveDown"></a><a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr><tr class="secondClassify">'+
					'<td colspan="3"><table><tbody><tr><td width="35%"><div class="secondBox"><span>子分类：</span><input type="text" value="" class="popForm popForm01"></div></td>'+
					'<td width="45%"><span>链接：</span><input type="text" value="" class="popForm popForm02"></td><td width="20%"><a class="subOpe moveUp" href="javascript:;" title="上移"></a>'+
					'<a class="subOpe moveDown" href="javascript:;" title="下移"></a><a class="subOpe conDelete" href="javascript:;" title="删除"></a></td></tr></tbody></table></td></tr>';		 
		$(".classifyPop .tableConList tbody").eq(0).append(newTr);		
    });
	
	$(".classifyPop .addSecond").live("click",function(e) {
		var newTr = '<tr><td width="35%"><div class="secondBox"><span>子分类：</span><input type="text" value="" class="popForm popForm01"></div></td><td width="45%"><span>链接：</span>'+
					'<input type="text" value="" class="popForm popForm02"></td><td width="20%"><a class="subOpe moveUp" href="javascript:;" title="上移"></a>'+
					'<a class="subOpe moveDown" href="javascript:;" title="下移"></a><a class="subOpe conDelete" href="javascript:;" title="删除"></a></td></tr>';
		var length = $(this).parents("tr.firstClassify").next(".secondClassify").length;
		$(this).parents("tr.firstClassify").next().find("tbody").append(newTr);
		
	});

	  // 插入分类
	$(".classifyPop .saveBtn").click(function(e) {
		var data =[];
		var flag = true;
		$(".classifyPop .tableConList .firstClassify").each(function(index){
			var dataUnit = {"title":"","detail":{"secondName":[],"href":[]}};			
			dataUnit["title"] = $.trim($(this).find(".popForm01").val());
			var $second = $(this).next(".secondClassify");
			if(dataUnit["title"]==""){
				flag = false;
			}
			$second.find("tr").each(function(i) {
				var secondName = $.trim($(this).find(".popForm01").val());
				var href = $.trim($(this).find(".popForm02").val());
				if(secondName==""||href.indexOf("jiuxian")<0){
					flag = false;
				}else{
					dataUnit["detail"]["secondName"].push(secondName);
					dataUnit["detail"]["href"].push(href);
				}
            });
			data.push(dataUnit); 
        });
		
		if(!flag){
			$.showAlert({"type":"alarm","content":"请输入分类标题和内部链接"});			
		}else{
			$(".modulesBox.focus").empty().append(shopComFilter);
			var i;
			var j;
			var length = data.length;
			for(i=0; i<length; i++)
			{
				var shopComFilterBoxHtml = shopComFilterBox.replace(/#{name}/g,data[i]["title"]);	
				var $shopComFilterBoxHtml = $(shopComFilterBoxHtml);
				var sLength = data[i]["detail"]["secondName"].length;
				for(j=0; j<sLength; j++){
					var shopComFilterLiHtml = shopComFilterLi.replace(/#{secondName}/g,data[i]["detail"]["secondName"][j]);
					shopComFilterLiHtml = shopComFilterLiHtml.replace(/#{href}/g,data[i]["detail"]["href"][j]);
					$shopComFilterBoxHtml.find("ul").append(shopComFilterLiHtml);
				}
				$(".modulesBox.focus").find(".shopComFilter").append($shopComFilterBoxHtml);
			}
			var dataString = JSON.stringify(data);	
		   	$(".modulesBox.focus").find(".shopComFilter").attr("data",dataString);
			closePop01();
			
		}
    });
	
	/*商品分类end*/
	
	/*侧导航start*/
	$(".anchorNavPop .addAnchorBtn").click(function(e) {
        var newTr = '<tr><td width="15%"><input type="text" value="#" class="popForm popForm04"></td><td width="15%"><input type="text" class="popForm popForm04">像素</td>'+ 
            		'<td width="20%"><a title="上移" href="javascript:;" class="popTabOpe moveUp"></a><a title="下移" href="javascript:;" class="popTabOpe moveDown"></a>'+ 
					'<a title="删除" href="javascript:;" class="popTabOpe conDelete"></a></td></tr>';
		$(".anchorNavPop .tableConList tbody").append(newTr);		
    });
	
	$(".anchorNavPop .saveBtn").click(function(e) {
		var flag = true;
		var data ={"isFirstShow":"","showLocation":"","heightToTop":"","imgHeight":"","imgWidth":"","marginTop":"","src":"","detail":[]};
		data["isFirstShow"] = $(".anchorNavPop .isFirstShow").val();
		data["showLocation"] = $(".anchorNavPop .showLocation").val();
		data["heightToTop"] = $.trim($(".anchorNavPop .heightToTop").val());
		data["marginTop"] = $.trim($(".anchorNavPop .marginTop").val());
		data["src"] = $.trim($(".anchorNavPop .anchorImg").val());
		data["imgHeight"] = $.trim($(".anchorNavPop .imgHeight").val());
		data["imgWidth"] = $.trim($(".anchorNavPop .imgWidth").val());
		if(data["src"]==""||data["imgHeight"]==""||data["imgWidth"]==""||data["heightToTop"]==""){
			flag = false;
		}
		$(".anchorNavPop .tableConList tr").each(function() {
			var dataUnit = {"href":"","height":""};
			var href = $.trim($(this).find(".popForm").eq(0).val());
			var height = $.trim($(this).find(".popForm").eq(1).val());
			if(href==""||height==""){
				flag = false;	
			}else{
				dataUnit["href"] = href;
				dataUnit["height"] = height;		
			}
			data["detail"].push(dataUnit);  
       });
	   if(!flag){
		 	$.showAlert({"type":"alarm","content":"请输入侧导航参数"});
	   }else{
		    $(".modulesBox.focus").empty().append(shopSidesNavBox);
			/*if(data["isFirstShow"]==1){
				$(".modulesBox.focus").find(".shopSidesNavBox").css({"display":"none"});
			}else{
				$(".modulesBox.focus").find(".shopSidesNavBox").css({"display":"block"});
			}*/
			var location =  $(".modulesBox.focus").parents(".layoutCon").offset().left;
			if(data["showLocation"]==1){ //右侧
				 $(".modulesBox.focus").find(".shopSidesNavBox").css({"left":location+990+5});
				
			}else{ //左侧
				$(".modulesBox.focus").find(".shopSidesNavBox").css({"left":location-data["imgWidth"]+90});
			}
		   	$(".modulesBox.focus").find(".shopSidesNavBox").css({
				"top":data["heightToTop"],
				"background-image":"url("+data["src"]+")",
				"padding-top":data["marginTop"]+"px",
				"height":data["imgHeight"],
				"width":data["imgWidth"]
			});
		   var i;
		   var length = data["detail"].length;
		   for(i=0; i<length; i++){
			   var shopSidesNavBoxLiHtml = shopSidesNavBoxLi.replace(/#{href}/g, data["detail"][i]["href"]);
			   $(".modulesBox.focus").find("ul").append(shopSidesNavBoxLiHtml); 
			    $(".modulesBox.focus").find("li").eq(i).css({"height":data["detail"][i]["height"]});
		   }	
		   $(".modulesBox.focus").find(".shopSidesNavBox").css({"height":"100px","width":"100px"});		   
		   $(".modulesBox.focus").css({"min-height":"60px"});
		   var dataString = JSON.stringify(data);	
		   $(".modulesBox.focus").find(".shopSidesNavBox").attr("data",dataString);
		   closePop01();	
	   }
    });
	
	/*侧导航end*/
	
	
	/*其他start*/
	$(".otherPop .saveBtn").click(function(e) {
		var data = {"id":"","margin":""};
		data["id"] = $.trim($(".otherPop .moduleId").val());
		data["margin"] = $.trim($(".otherPop .moduleMargin").val());
		$(".modulesBox.focus").attr("id",data["id"]).css({"margin-bottom":data["margin"]+"px"});
		var dataString = JSON.stringify(data);	
		$(".modulesBox.focus").attr("data",dataString);
		closePop01();
    });
	/*其他end*/
	
	/*背景设置start*/
	$(".backColorPop .selectBgImg").click(function(e) {
        var type = $(".backColorPop").attr("type");
        //ajax请求图片列表
        var firstLevel = -1;
		var secondLevel = -1;
		var imageName = "";
		var $imageList=$(".selectorPop .popConItem").eq(0);
		jQuery.ajax({
			  type:"post",
			  url:"/shop/imageListAjax.htm",
			  data:{ 'firstLevel':firstLevel,'secondLevel':secondLevel,'imageName':imageName,'pageSize':6,'pageNum':1},
			  dataType:"html",
			  cache:false,
			  async:false,
			  success:function(data){
				  if(data.status == 9){
					  $.showAlert({"type":"alarm","content":"登录信息失效，请重新登陆",callback:function(){
							 window.location.href = "http://login.jiuxian.com"
							 }});
				    }
			  $imageList.empty();
			  $imageList.html(data);
			  }
		  });
		$(".selectorPop,.bgPop02").show();
		$(".selectorPop").attr("type",type);
    });
	
	
	$(".backColorPop .saveBtn").click(function(e) {
		var $target = $(".layoutBox.on");
        var data = {"layoutCon":"","layoutBoxColor":"","layoutBoxImg":"","repeat":""};
		data["layoutCon"] = $.trim($(".backColorPop .bgColor").eq(0).val());
		data["layoutBoxColor"] = $.trim($(".backColorPop .bgColor").eq(1).val());
		data["layoutBoxImg"] = $.trim($(".backColorPop .bgImg").val());
		data["repeat"] = $(".backColorPop .bgRepeat").val();
		var bgData;
		if(data["layoutBoxColor"]==""&&data["layoutBoxImg"]!=""){
			bgData = "url("+data["layoutBoxImg"]+") "+data["repeat"];
		}else if(data["layoutBoxColor"]!=""&&data["layoutBoxImg"]!=""){
			bgData = "#"+data["layoutBoxColor"]+" url("+data["layoutBoxImg"]+") "+data["repeat"];
		}else if(data["layoutBoxColor"]!=""&&data["layoutBoxImg"]==""){
			bgData = "#"+data["layoutBoxColor"];
		}else if(data["layoutBoxColor"]==""&&data["layoutBoxImg"]==""){
			bgData = "none";
		}
		$target.css({"background":bgData});
		if(data["layoutCon"]!=""){
			$target.find(".layoutCon").css({"background":"#"+data["layoutCon"]});
		}else{
			$target.find(".layoutCon").css({"background":"none"});
		}
		var dataString = JSON.stringify(data);	
		$(".layoutBox.on").attr("data",dataString);
		closePop01();	
    });	
	$(".backColorPop .deleteBgImg").click(function(e) {
        $(".backColorPop .bgImg").val("");		
    });
	/*背景设置end*/
	
	
	/*页面属性和背景start*/
	
	$(".pageAttribute li input").blur(function(){
		var value = $.trim($(this).val());
		if(value!=""){
			$(this).siblings(".checktip").hide();
		}
	});
	
	
	$(".pageAttribute  .saveBtn").click(function(e) {
		var flag = true; 
        var data = {"name":"","title":"","keyWords":"","description":"","bgColor":"","bgImage":"","reaptPattern":"","isUseCommonHeader":"","action":""};
		var pageName = $.trim($(".pageAttribute .pageName").val());
		var pageTitle = $.trim($(".pageAttribute .pageTitle").val());
		var pageKeyword = $.trim($(".pageAttribute .pageKeyword").val());
		var pageDescript = $.trim($(".pageAttribute .pageDescript").val());
		var bgColor = $.trim($(".pageAttribute .bgColor").val());
		var bgImg = $.trim($(".pageAttribute .bgImg").val());
		var bgRepeat = $(".pageAttribute .bgRepeat").val();
		var isUseCommonHeader = 0;
		if($("#isUserHeader").attr("checked")){
			isUseCommonHeader = "1";
		}else{
			isUseCommonHeader = "0";
		}
		if(pageName==""){
			$(".pageAttribute .pageName").siblings(".checktip").show();
			return false;
		}
		else if(pageTitle==""){
			$(".pageAttribute .pageTitle").siblings(".checktip").show();
			return false;
			}
		else if(pageKeyword==""){
			$(".pageAttribute .pageKeyword").siblings(".checktip").show();
			return false;
			}
		else if(pageDescript==""){
			$(".pageAttribute .pageDescript").siblings(".checktip").show();
			return false;
		}else{
			data["name"] = pageName;
			data["title"] = pageTitle;
			data["keyWords"] = pageKeyword;
			data["description"] = pageDescript;
			data["bgColor"] = bgColor;
			data["bgImage"] = bgImg;
			data["reaptPattern"] = bgRepeat;
			data["isUseCommonHeader"] = isUseCommonHeader;
			
		}
			var dataString = JSON.stringify(data);	
			$(".layoutContain").attr("data",dataString);
			var pageType = $(this).attr("type");
			var actionType = $(this).attr("action");
			if(pageType == "home"){
				$.ajax({
					type:"post",
					data:data,
					url:"/shop/saveShopIndexBase.htm",
					dataType:"json",
					cache:false,
					success:function(data){
						
						if(data.status == 9){
							$.showAlert({"type":"alarm","content":"登录信息失效，请重新登陆",callback:function(){
							 window.location.href = "http://login.jiuxian.com"
							 }});
							
							}else if(data.status ==1){
							$.showAlert({"type":"success","content":"保存成功",callback:function(){
								window.location.reload();
							}});
							
						}else if(data.code == 999){
							$.showAlert({"type":"alarm","content":data.msg});
						}else{
							
							$.showAlert({"type":"alarm","content":"保存失败"});
						}
					}
					
				});
			}else if(pageType == "custom"){
					if(actionType == "newCustom"){
						data["action"] = "new";
						$.ajax({
							type:"post",
							data:data,
							url:"/shop/addCustomBaseInfo.htm",
							dataType:"json",
							cache:false,
							success:function(data){
								
								if(data.status == 9){
									$.showAlert({"type":"alarm","content":"登录信息失效，请重新登录",callback:function(){
									 window.location.href = "http://login.jiuxian.com"
									 }});
									
									}else if(data.status ==1){
									$.showAlert({"type":"success","content":"保存成功",callback:function(){
										window.location.href="http://shop.jiuxian.com/shop/customPageDec-" + data.customId + ".htm";
									}});
									
								}else if(data.code == 999){
									$.showAlert({"type":"alarm","content":data.msg});
								}else{
									$.showAlert({"type":"alarm","content":"保存失败"});
								}
							}
						});
					}else if(actionType = "updateCustom"){
						data["action"] = "update";
						$.ajax({
							type:"post",
							data:data,
							url:"/shop/addCustomBaseInfo.htm",
							dataType:"json",
							cache:false,
							success:function(data){
								
								if(data.status == 9){
									$.showAlert({"type":"alarm","content":"登录信息失效，请重新登录",callback:function(){
									 window.location.href = "http://login.jiuxian.com"
									 }});
									
									}else if(data.status ==1){
									$.showAlert({"type":"sucess","content":"保存成功",callback:function(){
										window.location.href="http://shop.jiuxian.com/shop/customPageDec-" + data.customId + ".htm";
									}});
									
								}else if(data.code == 999){
									$.showAlert({"type":"alarm","content":data.msg});
								}else{
									$.showAlert({"type":"alarm","content":"保存失败"});
								}
							}
						});
					}
			}
		$(".layoutContain").css({"background":"bgColor"});
    });
	
	$(".pageAttribute  .cancelBtn").click(function(e) {
		window.location.reload();
	});
	
	
	$(".pageAttribute .deleteBgImg").click(function(e) {
        $(".pageAttribute .bgImg").val("");		
    });
	
	$(".pageAttribute .selectBgImg").click(function(e) {
		var type = $(".pageAttribute").attr("type");
		//ajax请求图片列表
        var firstLevel = -1;
		var secondLevel = -1;
		var imageName = "";
		var $imageList=$(".selectorPop .popConItem").eq(0);
		jQuery.ajax({
			  type:"post",
			  url:"/shop/imageListAjax.htm",
			  data:{ 'firstLevel':firstLevel,'secondLevel':secondLevel,'imageName':imageName,'pageSize':6,'pageNum':1},
			  dataType:"html",
			  cache:false,
			  async:false,
			  success:function(data){
				  if(data.status == 9){
					  $.showAlert({"type":"alarm","content":"登录信息失效，请重新登陆",callback:function(){
							 window.location.href = "http://login.jiuxian.com"
							 }});
				    }
			  $imageList.empty();
			  $imageList.html(data);
			  var selectcontent = $("#firstLevelUserConPopSelect").html();
			  if(selectcontent.indexOf("全部")>0){
				  selectcontent = selectcontent.replace("全部","请选择");
			  }
			  if($("#firstLevelUserConPop") != undefined){
				  $("#firstLevelUserConPop").empty();
				  $("#firstLevelUserConPop").html(selectcontent);
			  }

			  },
		  });
		
        $(".selectorPop,.bgPop02").show();
		$(".selectorPop").attr("type",type);
    });
	
	/*页面属性和背景start*/
	
	/*文件选择器start*/
	
	//文件选择器tab切换
	$(".fileChooserBox .pcTit").click(function(e) {
		var index = $(".commonPop .pcTit").index($(this));
		$(this).addClass("on").siblings().removeClass("on");
		$(".fileChooserBox .tableConList table").empty();
		$(".fileChooserBox .popConItem").eq(index).show().siblings(".popConItem").hide();
		$("#file_upload_1,#file_upload_2").uploadify('cancel','*');
		filecount=0;
		countPic=0;
    });
	
	$(".commonPop .upImgBtn i,.commonPop .openFile").live("click",function(){
		var type = $(this).parents(".commonPop").attr("type");	
		var firstLevel = -1;
		var secondLevel = -1;
		var imageName = "";
		var $imageList=$(".selectorPop .popConItem").eq(0);
		jQuery.ajax({
			  type:"post",
			  url:"/shop/imageListAjax.htm",
			  data:{ 'firstLevel':firstLevel,'secondLevel':secondLevel,'imageName':imageName,'pageSize':6,'pageNum':1},
			  dataType:"html",
			  cache:false,
			  async:false,
			  success:function(data){
			  if(data.status == 9){
				  $.showAlert({"type":"alarm","content":"登录信息失效，请重新登陆",callback:function(){
						 window.location.href = "http://login.jiuxian.com"
						 }});
			    }
			  $imageList.empty();
			  $imageList.html(data);
			  var selectcontent = $("#firstLevelUserConPopSelect").html();
			  if(selectcontent.indexOf("全部")>0){
				  selectcontent = selectcontent.replace("全部","请选择");
			  }
			  $("#firstLevelFileContainer").empty();
			  $("#firstLevelFileContainer").html(selectcontent);
			  },
		  });
		
		$(".selectorPop,.bgPop02").show();
		$(".selectorPop").attr("type",type);
		$(".commonPop .upImgBtn i").removeClass("on");
		$(this).addClass("on");
	});

	$(".selectorPop .popPicList li").live("click",function(e) {
		var type = $(this).parents(".commonPop").attr("type");
		var src = $(this).find("img").attr("src");
		switch (type) {
			case "couponPop" :   //添加优惠券图片
			$(".couponPop .upImgBtn i.on").next("img").attr({"src":src,"href":src});
			break;
			
			case "sliderPop" :   //添加轮播图片
			$(".sliderPop .upImgBtn i.on").next("img").attr({"src":src,"href":src});
			break;
			
			case "adversePop" :   //添加广告位图片
			$(".adversePop .upImgBtn i.on").next("img").attr({"src":src,"href":src});
			break;

			case "anchorNavPop" :    //添加侧导航图片
			$(".anchorNavPop .anchorImg").val(src);
			break;	
			
			case "pageAttribute" :    //添加页面背景图片
			$(".pageAttribute .bgImg").val(src);
			break;	
			
			case "backColorPop" :    //添加布局背景图片
			$(".backColorPop .bgImg").val(src);
			break;			
		}
		closePop02();	
    });
	
	/*文件选择器end*/
	
	$(".shopSidesNavBox").addClass("show");
})


