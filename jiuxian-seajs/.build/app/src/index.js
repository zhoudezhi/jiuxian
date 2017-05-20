// JavaScript Document
define("../js/app/src/index", [ "jquery", "../../common/toast", "template", "templateNative", "../../tpl/page" ], function(require, exports, module) {
    var $ = require("jquery");
    /*图片延迟加载*/
    var toast = require("../../common/toast");
    toast.msg("0000");
    var data = [ {
        url: "../images/topbanner_1.jpg",
        text: "../images/topbanner_1.png",
        color: "#bb2d47"
    }, {
        url: "../images/topbanner_2.jpg",
        text: "../images/topbanner_1.png",
        color: "#90040f"
    }, {
        url: "../images/topbanner_3.jpg",
        text: "../images/topbanner_1.png",
        color: "#ffcee3"
    }, {
        url: "../images/topbanner_1.jpg",
        text: "../images/topbanner_1.png",
        color: "#bb2d47"
    }, {
        url: "../images/topbanner_2.jpg",
        text: "../images/topbanner_1.png",
        color: "#90040f"
    }, {
        url: "../images/topbanner_3.jpg",
        text: "../images/topbanner_1.png",
        color: "#ffcee3"
    } ];
    //模版加载方式一:简单模版
    var template = require("template");
    var html = template.render("slider", {
        list: data
    });
    $(".mainBanner").html(html);
    //模版加载方式二：原生模版
    var templateNative = require("templateNative");
    var source = require("../../tpl/page");
    var render = templateNative.compile(source);
    var html = render({
        list: data
    });
    $(".mainBanner").html(html);
    /*function name(){
		var name = '';
	}*/
    function lazyload(obj) {
        obj.find("img[loazy!=no]").lazyload({
            placeholder: "../static/src/images/loading.gif",
            effect: "fadeIn",
            threshold: 400
        });
    }
    //lazyload($("body"));
    /*var widthObj={"changeWidth_1":null,"changeWidth_2":null,"changeWidth_3":null,"pageNum":null}
	var docWidth_1=$(window).width();
	var ohead1 = document.getElementById("newLink");
	if(docWidth_1>1200)
	{
		widthObj.changeWidth_1 = 920;
		widthObj.changeWidth_2 = 1185;
		widthObj.changeWidth_3 = 184;
		widthObj.pageNum = 5;	
		ohead1.href="";
		
	}
	else
	{
		widthObj.changeWidth_1 = 720;
		widthObj.changeWidth_2 = 985;
		widthObj.changeWidth_3 = 180;
		widthObj.pageNum = 4;	
		ohead1.href="../static/src/css/index_1000.css";		
	}
	
	$(window).bind("resize",function(){
		var docWidth_2=$(window).width();
		if(docWidth_2>1200)
		{
			widthObj.changeWidth_1 = 920;
			widthObj.changeWidth_2 = 1185;
			widthObj.changeWidth_3 = 184;
			widthObj.pageNum = 5;	
			ohead1.href="";	
			currentPage_1=0;
			$(".buyBox ul").css("margin-left","0");
			$(".timeLimBox .titieBox li").eq(0).addClass("on").siblings().removeClass("on");
			$(".timeLimBox .contentBox").eq(0).show().siblings(".contentBox").hide();
			$(".timeLimBox .titleSlider").css("left","0");
		}
		else
		{
			widthObj.changeWidth_1 = 720;
			widthObj.changeWidth_2 = 985;
			widthObj.changeWidth_3 = 180;
			widthObj.pageNum = 4;	
			ohead1.href="../static/src/css/index_1000.css";
			currentPage_1=0;
			$(".buyBox ul").css("margin-left","0");
			$(".timeLimBox .titieBox li").eq(0).addClass("on").siblings().removeClass("on");
			$(".timeLimBox .contentBox").eq(0).show().siblings(".contentBox").hide();
			$(".timeLimBox .titleSlider").css("left","0");
		}
		resizeWidth();
	});*/
    /*轮播*/
    /*	$(".mainBanner").slide({
    titCell: ".smallBtn ul",
    mainCell: ".bigImg ul",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "mouseenter",
    startFun: function(i) {
        var curLi = jQuery(".mainBanner .bigImg li").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
     }
    });*/
    $(".mav a").mouseenter(function() {
        var $this = $(this);
        $this.next().show();
    });
    $(".mav a").mouseleave(function() {
        var $this = $(this);
        $this.next().hide();
    });
    /*轮播end*/
    /*限时抢购tab切换*/
    $(".timeLimBox .titieBox li").click(function(e) {
        var width = $(this).width();
        var $parents = $(this).parents(".timeLimBox");
        var index = $(".timeLimBox li").index($(this));
        $(".timeLimBox .titieBox li").removeClass("on");
        $(".timeLimBox .titieBox li").eq(index).addClass("on");
        $parents.find(".titleSlider").stop().animate({
            left: (width + 1) * index
        }, 500);
        $parents.find(".contentBox").hide();
        $parents.find(".contentBox").eq(index).show();
        currentPage_1 = 0;
        $(".buyBox ul").css("margin-left", "0");
    });
    $(".buyBox li").bind("mouseenter", function() {
        $(this).find(".buyButton").show();
    });
    $(".buyBox li").bind("mouseleave", function() {
        $(this).find(".buyButton").hide();
    });
    $(".numBuy .collect-but").bind("mouseenter", function() {
        $(this).addClass("on");
    });
    $(".numBuy .collect-but").bind("mouseleave", function() {
        if ($(this).attr("collect") == "collect") {
            return;
        } else {
            $(this).removeClass("on");
        }
    });
    $(".numBuy .collect-but").one("click", function() {
        $(this).addClass("on");
        $(this).css("cursor", "default");
        $(this).attr("collect", "collect");
        $(this).find("em").show();
        $(this).find("em").stop().animate({
            top: "-20px"
        }, 200);
        $(this).find("em").stop().animate({
            top: "-40px",
            opacity: "0"
        }, 500, function() {
            $(this).hide();
        });
    });
    /*限时抢购滚动*/
    var currentPage_1 = 0;
    $(".contentBox .nextPage").click(function(e) {
        var $this = $(this).parent();
        var pages = parseInt($this.find("li").length / widthObj.pageNum);
        var $bigUl = $this.find("ul").eq(0);
        currentPage_1++;
        if (currentPage_1 > pages) {
            currentPage_1--;
            return false;
        } else if (currentPage_1 == pages) {
            var remainNum = parseInt($this.find("li").length % widthObj.pageNum);
            var oNumber = widthObj.pageNum - remainNum;
            $bigUl.stop().animate({
                marginLeft: currentPage_1 * -widthObj.changeWidth_1 + oNumber * widthObj.changeWidth_3 + "px"
            }, 500);
        } else {
            $bigUl.stop().animate({
                marginLeft: currentPage_1 * -widthObj.changeWidth_1 + "px"
            }, 500);
        }
    });
    $(".contentBox  .prevPage").click(function(e) {
        var $this = $(this).parent();
        var pages = parseInt($this.find("li").length / widthObj.pageNum);
        var $bigUl = $this.find("ul").eq(0);
        currentPage_1--;
        if (currentPage_1 < 0) {
            currentPage_1++;
            return false;
        }
        $bigUl.stop().animate({
            marginLeft: currentPage_1 * -widthObj.changeWidth_1 + "px"
        }, 500);
    });
    /*限时抢购倒计时*/
    setInterval(function() {
        $(".timeRemain").each(function() {
            var time = parseInt($(this).attr("time"));
            if (time < 0 || isNaN(time)) {
                $(this).find("b").text("00");
            } else {
                time--;
                $(this).attr("time", time);
                var handerResult = handerTime(time);
                $(this).find(".hours").text(handerResult.h);
                $(this).find(".minus").text(handerResult.m);
                $(this).find(".seconds").text(handerResult.s);
            }
        });
    }, 1e3);
    function handerTime(time) {
        var h = parseInt(time / 3600);
        h = h < 10 ? "0" + h : h;
        var m = parseInt(time % 3600 / 60);
        m = m < 10 ? "0" + m : m;
        var s = parseInt(time % 60);
        s = s < 10 ? "0" + s : s;
        return {
            h: h,
            m: m,
            s: s
        };
    }
    /*促销活动*/
    /*$(".contentSecond a").bind('mouseenter',function(){
		$(this).stop().animate({'opacity':1},400);
		$(this).parent("li").siblings().find("a").stop().animate({'opacity':0.88},400);
	});
	
	$(".contentSecond ul").bind('mouseleave',function(){
		$(this).find("a").stop().animate({'opacity':1},400);
	});*/
    /*logo墙tab切换*/
    $(".contentThree .titieBox li").mouseenter(function(e) {
        var width = $(this).width();
        var $parents = $(this).parents(".contentThree");
        var $titieBox = $(this).parents(".titieBox");
        var index = $titieBox.find("li").index($(this));
        $titieBox.find("li").removeClass("on");
        $titieBox.find("li").eq(index).addClass("on");
        $parents.find(".titleSlider").stop().animate({
            left: (width + 15) * index
        }, 300);
        $parents.find(".logoBox").eq(index).show().siblings(".logoBox").hide();
    });
    /*logo墙换一换*/
    //录入数据
    function SetDate(obj) {
        var ilength = obj.find("li").length;
        var arr = [];
        var arrData = [];
        var num = 18 - ilength % 18;
        var m = "";
        for (var i = 0; i < num; i++) {
            obj.find("ul").append("<li>" + obj.find("ul li").eq(i).html + "</li>");
        }
        ilength = obj.find("li").length;
        m = ilength / 18;
        for (var i = 0; i < ilength; i++) {
            var getHtml = "<li>" + obj.find("ul li").eq(i).html() + "</li>";
            arr.push(getHtml);
        }
        for (var i = 0; i < m; i++) {
            arrData.push(arr.slice(i * 18, (i + 1) * 18).join(""));
        }
        for (var i = 0; i < m; i++) {
            var oUl = $("<ul>");
            oUl.append(arrData[0]);
            obj.find(".logoAll").append(oUl);
        }
        obj.find("ul").eq(0).remove();
    }
    for (var i = 0; i < 8; i++) {
        SetDate($(".logoBox:eq(" + i + ")"));
    }
    //function 
    var currentPage_2 = 0;
    $(".reflash").click(function(e) {
        var $logoAll = $(this).parents(".contentThree").find(".logoAll:visible");
        $logoAll.css("opacity", .5);
        var pages = $logoAll.find("ul").length;
        currentPage_2++;
        if (currentPage_2 >= pages) {
            currentPage_2 = 0;
        }
        $logoAll.css("marginLeft", currentPage_2 * -widthObj.changeWidth_2 + "px");
        $logoAll.stop().animate({
            opacity: 1
        }, 500);
    });
    /*logo墙品牌切换*/
    $(".logoAll a").mouseenter(function(e) {
        $(this).find("img").stop().animate({
            "margin-left": "-100px"
        }, 500);
    });
    $(".logoAll a").mouseleave(function(e) {
        $(this).find("img").stop().animate({
            "margin-left": "0"
        }, 500);
    });
    /*楼层tab切换*/
    $(".titleTab li").mouseenter(function(e) {
        var $titleTab = $(this).parents(".titleTab");
        var $parents = $(this).parents(".floor");
        var index = $titleTab.find("li").index($(this));
        $titleTab.find("li").removeClass("on");
        $titleTab.find("li").eq(index).addClass("on");
        $parents.find(".showBox").hide();
        $parents.find(".showBox").eq(index).show();
    });
    $(".promotionPro li").mouseenter(function(e) {
        $(this).addClass("on");
    });
    $(".promotionPro li").mouseleave(function(e) {
        $(this).removeClass("on");
    });
    /*酒友圈*/
    $(".wineFriends .rightContent li").hover(function(e) {
        $(this).addClass("on");
    }, function() {
        $(this).removeClass("on");
    });
    /*弹层*/
    //飘酒瓶
    $(".focusMask,.popFocus").show();
    $(".popFocusCon").addClass("animate_1");
    var widthP = ($(window).width() - 1200) / 2;
    var height = $(window).height();
    var winHei = $(window).height();
    $(".focusMask").css("height", winHei + "px");
    $(window).bind("resize", function() {
        var winHei_1 = $(window).height();
        $(".focusMask").css("height", winHei_1 + "px");
    });
    function getPositionRandom() {
        var position = {
            left: null,
            top: null
        };
        position.top = parseInt(Math.random() * -100) + "px";
        position.left = parseInt(Math.random() * 1e3 + widthP) + "px";
        return position;
    }
    function getTimeRandom() {
        var moveTime = (parseInt(Math.random() * 6) + 5) * 1e3;
        return moveTime;
    }
    function hide() {
        $(".popFocusCon").addClass("animate_2");
        setTimeout(function() {
            $(".popFocus").hide();
        }, 1e3);
        $(".focusMask").hide();
        $(".bottle").remove();
        creatDIV = function() {};
        moveRandom = function() {};
    }
    var creatDIV = function(index) {
        var div = '<div class="bottle bottle_' + index + '">';
        $("body").append(div);
        var p = getPositionRandom();
        $(".bottle_" + index).css({
            left: p.left,
            top: p.top
        });
    };
    var moveRandom = function(index) {
        $(".bottle_" + index).stop().animate({
            top: height + "px",
            opacity: "0.4"
        }, getTimeRandom(), function() {
            $(this).remove();
            creatDIV(index);
            moveRandom(index);
        });
    };
    for (var i = 1; i < 9; i++) {
        creatDIV(i);
        moveRandom(i);
    }
    var cc = setTimeout(function() {
        hide();
    }, 8e3);
    $(".popFocusClose").bind("click", function() {
        hide();
    });
    /*弹层end*/
    /*跟随层end*/
    var iScroll = $(window).scrollTop();
    var iTop = $(window).height() / 2 - 150;
    $(window).bind("resize", function() {
        iTop = $(window).height() / 2 - 150;
        $(".fixDiv").css("top", iTop);
    });
    var whiteWineTop = $(".whiteWine").offset().top - iTop;
    var redWineTop = $(".redWine").offset().top - iTop;
    var foreignWineTop = $(".foreignWine").offset().top - iTop;
    var healthWineTop = $(".healthWine").offset().top - iTop;
    var contentThreeTop = $(".contentThree").offset().top - iTop;
    var contentSecond = $(".contentSecond ").offset().top - iTop;
    var arrPosition = [ whiteWineTop + iTop, redWineTop + iTop, foreignWineTop + iTop, healthWineTop + iTop ];
    var bStop = 1;
    var bStopScroll = 1;
    var timeShow = null;
    $(".fixDiv").css("top", iTop);
    resizeWidth();
    scrollTop();
    $(window).bind("scroll", function() {
        scrollTop();
    });
    function resizeWidth() {
        var iL = parseInt(($(window).width() - $(".mainBox").width()) / 2);
        var fixL = parseInt(iL - $(".fixDiv").width() - 10);
        $(".fixDiv").css("left", fixL + "px");
    }
    function changeEffect(x) {
        if (bStop) {
            //clearTimeout(timeShow)
            $(".fixDiv").css({
                zIndex: "300",
                "-webkit-transform": "scaleY(1)",
                "-moz-transform": "scaleY(1)",
                transform: "scaleY(1)",
                "-ms-transform": "scaleY(1)",
                "-o-transform": "scaleY(1)",
                opacity: 1
            });
            $(".fixDiv div").each(function(i, element) {
                $(this).find("a:eq(1)").css("opacity", 1);
                $(this).find("a:eq(0)").text("");
                $(this).find("a:eq(0)").attr("on", 0);
                $(this).find("a:eq(0)").hide();
            });
            $(".fixDiv div:eq(" + x + ")").find("a:eq(1)").css("opacity", 0);
            $(".fixDiv div:eq(" + x + ")").find("a:eq(0)").text($(".fixDiv div:eq(" + x + ")").find("a:eq(0)").attr("name"));
            $(".fixDiv div:eq(" + x + ")").find("a:eq(0)").attr("on", 1);
            $(".fixDiv div:eq(" + x + ")").find("a:eq(0)").show();
        }
    }
    function scrollTop() {
        if (bStopScroll) {
            if ($(window).scrollTop() <= contentSecond) {
                $(".fixDiv").css({
                    "-webkit-transform": "scaleY(1.5)",
                    "-moz-transform": "scaleY(1.5)",
                    transform: "scaleY(1.5)",
                    "-ms-transform": "scaleY(1.5)",
                    "-o-transform": "scaleY(1.5)",
                    opacity: 0
                });
                timeShow = setTimeout(function() {
                    $(".fixDiv").css("zIndex", "10");
                }, 500);
            } else if ($(window).scrollTop() > contentSecond && $(window).scrollTop() <= whiteWineTop) {
                //$('.fixDiv').css('display','block');
                //	setTimeout(function(){
                $(".fixDiv").css({
                    zIndex: "300",
                    "-webkit-transform": "scaleY(1)",
                    "-moz-transform": "scaleY(1)",
                    transform: "scaleY(1)",
                    "-ms-transform": "scaleY(1)",
                    "-o-transform": "scaleY(1)",
                    opacity: 1
                });
            } else if ($(window).scrollTop() >= whiteWineTop && $(window).scrollTop() < redWineTop) {
                changeEffect(0);
            } else if ($(window).scrollTop() >= redWineTop && $(window).scrollTop() < foreignWineTop) {
                changeEffect(1);
            } else if ($(window).scrollTop() >= foreignWineTop && $(window).scrollTop() < healthWineTop) {
                changeEffect(2);
            } else if ($(window).scrollTop() >= healthWineTop && $(window).scrollTop() < contentThreeTop) {
                changeEffect(3);
            } else {
                if (bStop) {
                    $(".fixDiv div").each(function(i, element) {
                        $(this).find("a:eq(1)").css("opacity", 1);
                        $(this).find("a:eq(0)").text("");
                        $(this).find("a:eq(0)").hide();
                        $(this).attr("on", 0);
                    });
                }
            }
        }
    }
    $(".fixDiv div").each(function(i, element) {
        $(this).bind("click", function() {
            bStopScroll = 0;
            changeEffect(i);
            $(".fixDiv div:eq(" + i + ")").find("a:eq(0)").text($(".fixDiv div:eq(" + i + ")").find("a:eq(0)").attr("hname"));
            $(this).find("a:eq(0)").attr("on", 1);
            $("html,body").stop().animate({
                scrollTop: arrPosition[i]
            }, 400);
        });
    });
    $(".fixDiv div").bind("mouseenter", function() {
        $(this).find("a:eq(1)").stop();
        $(this).find("a:eq(0)").stop();
        $(this).find("a:eq(1)").css("opacity", 0);
        $(this).find("a:eq(0)").show();
        $(this).find("a:eq(0)").text($(this).find("a:eq(0)").attr("hname"));
        if (!$(this).find("a:eq(0)").is(":animated")) {
            $(this).find("a:eq(0)").stop().animate({
                width: $(this).find("a:eq(0)").attr("w")
            }, 400);
        }
    });
    $(".fixDiv div").bind("mouseleave", function() {
        var _this = $(this);
        _this.find("a:eq(0)").stop().animate({
            width: "30px"
        }, 400, function() {
            if (_this.find("a:eq(0)").attr("on") == 1) {
                _this.find("a:eq(0)").text(_this.find("a:eq(0)").attr("name"));
            } else {
                _this.find("a:eq(1)").stop().animate({
                    opacity: .8
                }, 100, function() {
                    _this.find("a:eq(0)").hide();
                    _this.find("a:eq(1)").css("opacity", "1");
                });
            }
        });
        bStop = 1;
        bStopScroll = 1;
    });
    $(".fixDiv span").bind("click", function() {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800);
    });
    $(".fixDiv span").bind("mouseenter", function() {
        $(this).find("i").css("background-position", "-302px -134px");
    });
    $(".fixDiv span").bind("mouseleave", function() {
        $(this).find("i").css("background-position", "-274px -134px");
    });
});