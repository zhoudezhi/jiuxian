// JavaScript Document
define(function(require, exports, module){
	var $ = require('zepto');
	var API_AJAX = require('api');
	var utility = require("utility");
	var Swiper =require("swiper");
    var toast = require("toast");
    var showDialog = require("dialog");
	var template = require('template');
    var goTop = require("goTop");
    goTop();
	var param = utility.parseQueryString();
	var articleId = param['articleId'];
    var HOST_NAME = 'http://homeapi.jd.com';
	var articleDate = {
		url : HOST_NAME+'/api/jz/hardcoverDetail.do',
        body:{
            id:articleId,
            type:1
        },
        async:false
	};

	API_AJAX.jsonp(articleDate).done(function(res){
		res || (res = {});
        var result = res.model;
        var result = {
                        baseInfo:{
                            id: 14085,
                            labels:"",
                            title:"北欧风情清新地中海浪漫卧室",
                            titlePicUrl:"",
                            articleType:"",
                            praisecount:"",
                            browsecount:"",
                            summary:"每个人的户型图都不一样，我最大的改动是把门口入户花 园的墙砸掉了。和客厅打通后做了开放式的书房。其它范 围就做了一些小范围的调。",
                            details:'<p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p>',
                            writerVo:{
                                id:33928,
                                nickName:"绵绵的兔兔",
                                headPicUrl:"../images/images/designer.png",
                                roleId:1
                            },
                            
                            articleVos:[
                                {
                                    id:1,
                                    title:"客厅",
                                    titlePicUrl:"../images/images/1.jpg",
                                    content:"",
                                    threeDimensionalImgInfo:"",
                                    support3d:"",
                                    extendJson:""               
                                },
                                {
                                    id:2,
                                    title:"卧室",
                                    titlePicUrl:"../images/images/2.jpg",
                                    content:"",
                                    threeDimensionalImgInfo:"",
                                    support3d:"",
                                    extendJson:""               
                                },
                                {
                                    id:2,
                                    title:"厨房",
                                    titlePicUrl:"../images/images/3.jpg",
                                    content:"",
                                    threeDimensionalImgInfo:"",
                                    support3d:"",
                                    extendJson:""               
                                }
                                
                            ],
                            houses:{
                                name:"国风美仑",
                                provinceName:"",
                                cityName:"北京",
                                room:3,
                                hall:2,
                                cook:1,
                                bathroom:1,
                                houseImg:"../images/images/3.jpg",
                                houseArea:"100"
                            }
                        },
                        isAddCart:1,
                        isLogin:1                                 
                    }
		//模版加载方式一:简单模版
		isAddCart = result.isAddCart; 
        isLogin = result.isLogin; 
        $(".match-detail-page").prepend(template.render('jing-detail-tpl', {data:result}));
        initSlider1();
        getMoreMatch();
	}).fail(function(error){
		error || (error ={})
        toast.msg(error.msg);
	});

     //京装更多搭配   
    function getMoreMatch(){
        var data = {
            url:  HOST_NAME+'/api/jz/recommend.do',
            body: {
              id: articleId
            },
        }
        API_AJAX.jsonp(data).done(function(res){
             res || (res = {});
            var model  = res.model || {};
            var result =  model.value || []; 
            var result = [
                    {
                        hardcoverId:1437,
                        housesName:"国风美仑",
                        houseArea:"103",
                        room:1,
                        hall:3,
                        bathroom :1,
                        roomNum:3,
                        recommendType:"同小区同户型",
                        title:"北欧风情清新地中海浪漫卧室1",
                        titlePicUrl:"../images/images/demo.jpg"
                    },{
                        hardcoverId:1437,
                        housesName:"富力尚悦居",
                        houseArea:"113",
                        room:3,
                        hall:2,
                        bathroom :1,
                        roomNum:4,
                        recommendType:"同小区不同户型",
                        title:"北欧风情清新地中海浪漫卧室2",
                        titlePicUrl:"../images/images/demo.jpg"
                    },{
                        hardcoverId:1437,
                        housesName:"富力尚悦居2",
                        houseArea:"143",
                        room:3,
                        hall:2,
                        bathroom :2,
                        roomNum:5,
                        recommendType:"同小区不同户型",
                        title:"北欧风情清新地中海浪漫卧室3",
                        titlePicUrl:"../images/images/demo.jpg"
                    }
                ]
            $(".more-match-box").html(template.render('more-match-tpl',{data:result}));
            if(isAddCart && isLogin){
               getCart(); 
            }
        }).fail(function(error){
            error || (error ={})
            toast.msg(error.msg);
        });
    }

    //获取购物车数据
    function getCart(){
        var data = {
            url:  HOST_NAME+'/api/jz/getSkusByArticleIds.do',
            body: {
              id: articleId
            },
        }
        API_AJAX.jsonp(data).done(function(res){
            res || (res = {});
            var model = res.model || {};
            var result = model.value || [];
             result = [
                    {
                        "articleId": 1234,
                        "name": "卧室",  
                        "skuNum":2,      
                        "articleAssemble": [
                            {
                                "skuId": 3431731,
                                "skuImgUrl": "../images/images/designer.png",
                                "skuName": "好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示"
                            },
                            {
                                "skuId": 1125276,
                                "skuImgUrl": "../images/images/designer.png",
                                "skuName": "好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示"
                            }
                        ]
                    },
                    {
                        "articleId": 1234,
                        "name": "客厅",  
                        "skuNum":2,   
                        "articleAssemble": [
                            {
                                "skuId": 3581605,
                                "skuImgUrl": "../images/images/designer.png",
                                "skuName": "好事达书柜书架 简约置物架自  木质层架收纳展示"
                            },
                            {
                                "skuId": 231407,
                                "skuImgUrl": "../images/images/designer.png",
                                "skuName": "好好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示东西"
                            }
                        ]
                    }
                ]
            var data2 = {
                url: HOST_NAME+"/api/sales/getSalesContent.do",
                body: {
                  id: articleId
                },
            }
            API_AJAX.jsonp(data2).done(function(promotion){
                promotion = {
                          "SalesPromotion": [
                            {
                              "name": "满100减20，满200减50",
                              "type": 1,
                              "satisfy": 100,
                              "favorable": 20
                            },
                            {
                              "name": "满200减50，满200减50",
                              "type": 1,
                              "satisfy": 200,
                              "favorable": 50
                            }
                          ]
                }
                promotion || (promotion = {});
                var promotionRule = promotion.SalesPromotion || [];

                getPrices(result,promotionRule);
            });
        }).fail(function(error){
            error || (error ={})
            toast.msg(error.msg);
        });
    }

    //获取商品价格
    function getPrices(result,promotionRule){
        var skuIds = []; //sku集合
        var skuNum = 0;  //商品总数量
        var totalPrice = 0;  //商品总金额
        var priceArr = [];
        $.each(result,function(index1,value1){
            var temp = value1.articleAssemble || [];
            skuNum = skuNum + value1.skuNum;
            $.each(temp,function(index2,value2){
                if(value2.skuId){
                    skuIds.push(value2.skuId);
                }
            });
        });
        $(".collect-box").append(template.render('cart-bottom-tpl',{skuNum:skuNum,promotionRule:promotionRule}));
        $(".pop-cart-box").html(template.render('cart-list-tpl',{data:result,skuNum:skuNum,promotionRule:promotionRule}));
        var data = {
            url :"http://pm.3.cn/prices/mgets?area=&origin=2&source=20&",
            body :{
                skuids:skuIds.join(",")
            }
        }
        API_AJAX.jsonp(data).done(function(result){
            result || (result = []);
            $.each(result,function(index, value){
                var skuId = value.id;
                var price = parseFloat(value.p);
                //totalPrice = totalPrice + price;
                priceArr.push(price);
                $(".good-price[skuId='"+skuId+"']").find("em").text(value.p);
            });
            //totalPrice = totalPrice.toFixed(2);
            console.log(priceArr);
            totalPrice = countPromotion(priceArr,promotionRule);
            $(".totalPrice").text("¥"+totalPrice);
            console.log(totalPrice);
        }).fail(function(error){
            error || (error ={})
            toast.msg(error.msg);
        });
    }

    //计算促销优惠信息
    function countPromotion(arr,promotionRule){
      if(promotionRule && promotionRule.length){//促销规则入口       
            var sum = arr.reduce( function ( a, b ) {
              return a + b;
            });
            if(promotionRule[0].type==1||promotionRule[0].type==3){//满减,用sum去匹配最大满减额度
              var promotionNum = 0;
              //先按照额度做个排序
              promotionRule.sort(function(a,b){
                return b.satisfy-a.satisfy;
              });
              //从大到小遍历，第一个符合的计算后退出逻辑
              for(i=0;i<promotionRule.length;i++){
                  if(sum>=promotionRule[i].satisfy){
                    promotionNum = promotionRule[i].favorable;                    
                    break;
                  }
              }
              if(promotionNum>0){
                  //2.1提示已经满减，满5000-500，满10000-1000,已省230元
                  $(".promotionPrice").text("(已省¥"+promotionNum.toFixed(2)+")").show();
              }else{
                  //2.2清空满减提示
                  $(".promotionPrice").text("").hide();
              }
              return (sum - promotionNum).toFixed(2);
            }else{//满免，末尾喊价后计算
                arr.sort(function(a,b){
                    return b-a;
                });
                var count = promotionRule[0].satisfy;
                var pop = promotionRule[0].favorable;
                var pops = 0;
                if(arr.length>=count){
                    for(var j=0;j<pop;j++){
                        pops+=arr.pop();
                    }
                    //3.1提示满5免1,
                    $(".promotionPrice").text("(已免"+pop+"件¥"+pops+")").show();
                }else{
                    //3.2清除满免提示
                    $(".promotionPrice").text("").hide();
                }
                return (arr.reduce( function ( a, b ) {
                    return a + b;
                })).toFixed(2);
            }
      }else{//4.没有优惠规则直接计算
        return (arr.reduce( function ( a, b ) {
            return a + b;
        })).toFixed(2);
      }
    }


	 function initSlider1(){
        /*第一个轮播图 start*/
        var first = new Swiper('.banner-slider-box', {
            roundLengths : true,
            initialSlide :0,
            speed:600,
            slidesPerView:"auto",
            pagination: '.banner-swiper-pagination',
            centeredSlides : true,
            followFinger : true,
            loop : true,
            onInit: function(data){
                //初始化
                $('.banner-slider-box li').eq(data.activeIndex).addClass('first');
                //alert(data.activeIndex);提示Swiper的当前索引
            },
            onSlideChangeStart:function(data){
                var $current = $(".banner-slider-box li").eq(data.activeIndex);
                $current.addClass("actived").siblings().removeClass('actived first');
                var src =  $current.find('img').attr('src');
                var title = $current.find('.title').text();
                var roomId = $current.find('.title').attr("roomId");
                $('.banner-slider-box').css({
                    'background':"url("+src+") no-repeat",
                    'background-size':'cover'
                });
                $('.banner-slider-box .goto-room').attr({"href":"jing-room.html?articleId="+articleId+"&roomId="+roomId}).find("span").text(title);
            }
        });
    /*第一个轮播图 end*/
    }

    $(".match-detail-page").delegate(".designer-detail .follow","click",function(){
        $this = $(this);
        var flag = "";
        var writerId = $(this).attr("writerId");
        $(this).hasClass("on")?flag=false:flag=true;
        var data = {
            url :HOST_NAME+"/api/attention/attentionWriter.do",
            body:{
               writerId :writerId,
                flag:flag 
            }
        }
        API_AJAX.jsonp(data).done(function(res){
            flag?text = "已关注":text ="关注TA";
            flag? msg = '关注成功':msg ='取消关注成功';
            $this.toggleClass("on").find("em").text(text);
            toast.msg(msg);
        }).fail(function(error){
            error || (error ={})
            toast.msg("关注失败");
        });
      
    });

    //查看更多图文详情
    $(".match-detail-page").delegate(".show-more-detail span","click",function(){
        $(".article-detail").css({
            "max-height":"none"
        });
        $(".show-more-detail").remove();
    });

    //收藏文章
    $(".match-detail-page").delegate(".collect-box .collect-btn","click",function(){
        $this = $(this);
        var flag = "";
        var articleId = $(this).attr("articleId");
        $(this).hasClass("on")?flag=0:flag=1;
        if(flag){
            collectHander(flag,articleId,$this);
        }else{
            showDialog({
                title:"确定要取消收藏吗?",
                type:"confirm",
                callback:function(){
                    collectHander(flag,articleId,$this);
                }
            });
        }
    });

    function collectHander(flag,articleId,$this){
        var data = {
            url:HOST_NAME+'/api/articlePraise/favArticle.do',
            body: {
                flag:flag,
                articleId:articleId
            }
        }
        API_AJAX.jsonp(data).done(function(result){
            flag?text = "已收藏":text ="收藏搭配";
            $this.toggleClass("on").find("em").text(text);
        }).fail(function(error){
            error || (error ={})
            toast.msg(error.msg);
        });
    }

	 //展开购物车
    $(".match-detail-page").delegate(".collect-box .show-btn","click",function(){
        //getCart();
        //$("body").addClass("overflowHide");
        $(".collect-box .show-btn").hide().siblings(".hide-btn").show();
        $(".pop-cart-box").removeClass('todown').addClass('toup');
        $(".pop-cart-mask").show();
        $(".pop-cart-box").removeClass("hide");
    });

    //收起购物车
    $(".match-detail-page").delegate(".collect-box .hide-btn","click",function(){
        //$("body").removeClass("overflowHide");
        $(".collect-box .hide-btn").hide().siblings(".show-btn").show();
        $(".pop-cart-box").removeClass('toup').addClass('todown');
        setTimeout(function(){
            $(".pop-cart-mask").hide();
            $(".pop-cart-box").addClass("hide");       
        },100);   
    });
	

	
	
	
	

	


	//模版加载方式二：原生模版
	/*var templateNative = require('templateNative');
	var source = require("../../tpl/page");
	var render = templateNative.compile(source);
	var html = render({list:data});
	$(".mainBanner").html(html);*/



	
	
	
	

});