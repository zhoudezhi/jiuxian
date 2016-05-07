// JavaScript Document

/* 
* Name: 店铺装修模块变量js
* Copyright: 周德志 
* Date: 2014-12-30  
*/

/*布局模块start*/	

/*var layoutBox = '<div class="layoutBox"><div class="layoutCon"></div></div>'; */    //模块区域外层

var msgDefaults = '<div class="modulesBox"><div class="msgDefaults">请设置数据</div></div>';//设置数据

var addModules = '<div class="addModules"><a class="addModuleBtn" href="javascript:;">添加模块</a></div>';//添加模块

var layoutOne = '<div class="layoutOne">'+addModules+'</div>';//通栏（宽度100%）

var layoutOne990 = '<div class="layoutOne wid990">'+addModules+'</div>'; //通栏（宽度990）

var layoutTwo_1 = '<div class="layoutTwo-left wid490">'+addModules+'</div>'+
        	 	'<div class="layoutTwo-right wid490">'+addModules+'</div>';//左右布局（490+490）
			  
var layoutTwo_2 = '<div class="layoutTwo-left wid240">'+addModules+'</div>'+
        		'<div class="layoutTwo-right wid740">'+addModules+'</div>';//左右布局（240+740）
				
var layoutTwo_3 = '<div class="layoutTwo-left wid740">'+addModules+'</div>'+
				'<div class="layoutTwo-right wid240">'+addModules+'</div>';//左右布局（740+240）

var layoutTwo_4 = '<div class="layoutTwo-left wid330">'+addModules+'</div>'+
				'<div class="layoutTwo-right wid650">'+addModules+'</div>';//左右布局（330+650）

var layoutTwo_5 = '<div class="layoutTwo-left wid650">'+addModules+'</div>'+
				'<div class="layoutTwo-right wid330">'+addModules+'</div>';//左右布局（650+330）

var layoutThree_1 = '<div class="layoutThree-left wid240">'+addModules+'</div>'+
        		'<div class="layoutThree-middle wid490">'+addModules+'</div>'+
        		'<div class="layoutThree-right wid240">'+addModules+'</div>';//左中右布局（240+490+240）
				
var layoutThree_2 = '<div class="layoutThree-left wid240">'+addModules+'</div>'+        		
        		'<div class="layoutThree-middle wid240">'+addModules+'</div>'+
				'<div class="layoutThree-right wid490">'+addModules+'</div>';//左中右布局（240+240+490）
				
var layoutThree_3 = '<div class="layoutThree-left wid490">'+addModules+'</div>'+
        		'<div class="layoutThree-middle wid240">'+addModules+'</div>'+
        		'<div class="layoutThree-right wid240">'+addModules+'</div>';//左中右布局（490+240+240）
		
/*var layoutNav = '<div class="shopRightNavBox">'+addModules+'</div>';  //右导航*/
/*布局模块end*/



var shopHeader = '<div class="shopHeader"><a target="_blank" href="#{href}"><img src="#{src}" alt=""></a></div>';  //店招

/*店铺导航start*/		
var shopNav = '<div class="shopNav"><div class="shopNavCon"><ul><li class="on"><a target="_blank" href="javascript:;">首页</a></li></ul>'+
              '<div class="shopNavSearch"><input type="text" class="search-text"><a target="_blank" href="javascript:;" class="search-but"><i class="shopIcon"></i></a></div>'+
              '</div></div>';
var shopNavLi = '<li><a target="_blank" href="#{href}">#{navName}</a></li>';
/*店铺导航end*/		

var shopIntroduction = '<div class="shopIntroduction">'+
                '<div class="shopBrandLogo"><img width="150" height="100" src="#{src}"></div>'+
                '<h3 class="shopIntroTit">品牌介绍<br>Introduction</h3><div class="shopIntroLine"></div>'+
                '<div class="shopIntroCon">#{detail}</div>'+
            	'</div>';   //店铺简介
				
var userDefinedBox = '<div class="userDefinedBox"></div>';		 //自定义区域	
				
/*轮播模块start*/		
var sliderBox_1 = '<div class="mainBanner">'+
					'<span class="prevPage arrow"></span>'+
					'<div class="imgBox"><ul class="bigUl"></ul></div>'+
  					'<div class="smallBtn"><ul class="smallUl"></ul></div>'+
	 				'<span class="nextPage arrow"></span>'+
				  '</div>';
/*var sliderLi_1 = '<li style="background:##{color}">'+
					'<div class="focusBox"><a class="focusArea" target="_blank" href="#{href}"><img class="imgAnimate" src="#{src}" /></a></div>'+
				 '</li>';	*/
var sliderLi_1 = '<li style="background:##{color} url(#{src}) no-repeat center center">'+
					'<div class="focusBox"><a class="focusArea" target="_blank" href="#{href}"></a></div>'+
				 '</li>';			 		
var sliderBox_2 = '<div class="floorSlider">'+
					'<span class="prevPage arrow"></span>'+
					'<div class="imgBox"><ul class="bigUl clearfix"></ul></div>'+
					'<div class="btnBox"><ul class="smallUl"></ul></div>'+
					'<span class="nextPage arrow"></span>'+
				  '</div>';
var sliderLi_2 = '<li><a target="_blank"  href="#{href}"><img alt="" src="#{src}" /></a></li>';			  
/*轮播模块end*/

/*优惠券start*/	
var shopCouponBox = '<div class="shopCouponBox"></div>';
var shopCouponBoxLi = '<a href="javascript:;" couponid="#{couponid}" activeid="#{activeid}"><img src="#{src}"></a>';
/*优惠券end*/		

var shopFocusBox = '<div class="shopFocusBox"><a target="_blank" href="#{href}"><img width="100%" src="#{src}" /></a></div>'; /*广告位*/

var shopSearchBox = '<div class="shopSearchBox"><b class="seaTit">本店快速搜索</b><input type="text" class="seaText">'+
				   '<span class="seaPri"><em class="pri">价格</em><em class="priVal"><i>¥</i><input type="text" value="" maxlength="6"></em><em class="zhi"></em>'+
				   '<em class="priVal"><i>¥</i><input type="text" value="" maxlength="6"></em></span>'+
               	   '<a target="_blank" href="javascript:;" class="seaBut"><i class="shopIcon"></i></a></div>';  /*店内搜索*/
				   
var shopCountdown = '<div class="shopCountdown"><p class="shopCountdownCon"><i class="shopIcon"></i><span class="title">距离活动结束还有</span>'+
            		'<b class="shopIcon day">00</b><em>天</em><b class="shopIcon hour">00</b><em>时</em>'+
            		'<b class="shopIcon minute">00</b><em>分</em><b class="shopIcon second">00</b><em>秒</em></p></div>';   /*全场倒计时*/				
/*商品start*/							
var shopComBox = '<div class="shopComBox"><ul class="clearfix"></ul></div>';
var shopComBoxLi = '<li><div class="sComPic"><a href="#{href}" target="_blank"><img width="240" src="#{src}" alt="#{title}"></a><p class="Tag" style="background-position:#{position}"></p></div>'+
                    '<div class="sComIntro">'+
						'<p class="sCom-name"><a href="javascript:;" target="_blank" title="#{title}">#{title}</a></p><p class="sCom-pro">#{slogan}</p>'+
                        '<p class="sCom-price"><span>￥<em>#{price}</em></span><a class="sBayBut" href="#{href}" target="_blank">立即抢购</a></p>'+                        
                   '</div></li>';
/*商品end*/	

var shopNoticeBox = '<div class="shopNoticeBox"><div class="shopDefaultTit">店铺公告</div><div class="shopNoticeCon detail">#{detail}</div></div>'; //店铺公告

/*排行榜start*/	
var shopSellerBox = '<div class="shopSellerBox"><div class="shopDefaultTit">#{title}</div><div class="seller-con"><ul></ul></div></div>';

var shopSellerBoxLi = 	'<li class="clearfix"><div class="sellerPic"><a href="#{href}" target="_blank"><img width="64" height="64" src="#{src}" alt="#{title}"></a></div>'+
                        '<div class="sellerIntro"><p class="seller-name"><a title="#{title}" href="#{href}" target="_blank">#{title}</a></p>'+
                        '<p class="seller-price">#{price}</p></div></li>';
/*排行榜start*/	

/*商品分类start*/	
var shopComFilter = '<div class="shopComFilter"></div>';           
var shopComFilterBox = '<div class="filterBox on"><div class="fil-tit"><i class="shopIcon"></i><span>#{name}</span></div><div class="fil-con"><ul></ul></div></div>';                                           
var shopComFilterLi =  '<li><a href="#{href}" target="_blank"><i>〉</i>#{secondName}</a></li>';                      		
/*商品分类end*/	

/*左右导航start*/	
var shopSidesNavBox =  '<div class="shopSidesNavBox"><ul></ul></div>';
var shopSidesNavBoxLi = '<li><a href="#{href}"></a></li>';
/*左右导航start*/	
