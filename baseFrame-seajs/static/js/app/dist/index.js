// JavaScript Document
define("../js/app/dist/index", [ "fastclick", "zepto", "template", "helper", "api", "utility", "swiper", "dialog", "toast", "goTop", "loadjs", "md5", "jdShare", "../../tpl/page.html" ], function(require, exports, module) {
    var attachFastClick = require("fastclick");
    attachFastClick(document.body);
    var $ = require("zepto");
    var template = require("template");
    require("helper");
    var API_AJAX = require("api");
    var utility = require("utility");
    var Swiper = require("swiper");
    var dialog = require("dialog");
    var toast = require("toast");
    var goTop = require("goTop");
    var loadjs = require("loadjs");
    var md5 = require("md5");
    console.log(md5("周德志"));
    var jdShare = require("jdShare");
    //jdShare.setShareInfo();
    /*loadjs("http://misc.360buyimg.com/business/test/js/tools/swiper.js").done(function(){
        alert("1")
    });*/
    goTop();
    var param = utility.parseQueryString();
    var articleId = param["articleId"];
    var HOST_NAME = "http://homeapi.jd.com";
    var articleDate = {
        url: HOST_NAME + "/api/jz/hardcoverDetail.do",
        body: {
            id: 91914,
            type: 1
        },
        async: false
    };
    API_AJAX.jsonp(articleDate).done(function(res) {
        res || (res = {});
        var result = res.model;
        var result = {
            baseInfo: {
                id: 14085,
                labels: "",
                title: "北欧风情清新地中海浪漫卧室",
                titlePicUrl: "",
                articleType: "",
                praisecount: "",
                browsecount: "",
                summary: "每个人的户型图都不一样，我最大的改动是把门口入户花 园的墙砸掉了。和客厅打通后做了开放式的书房。其它范 围就做了一些小范围的调。",
                details: '<p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p><img src="../images/images/demo.jpg"><p>每个人的户型图都不一样，我最大的改动是把门口入户花</p>',
                writerVo: {
                    id: 33928,
                    nickName: "绵绵的兔兔",
                    headPicUrl: "../images/images/designer.png",
                    roleId: 1
                },
                articleVos: [ {
                    id: 1,
                    title: "客厅",
                    titlePicUrl: "../images/images/1.jpg",
                    content: "",
                    threeDimensionalImgInfo: "",
                    support3d: "",
                    extendJson: ""
                }, {
                    id: 2,
                    title: "卧室",
                    titlePicUrl: "../images/images/2.jpg",
                    content: "",
                    threeDimensionalImgInfo: "",
                    support3d: "",
                    extendJson: ""
                }, {
                    id: 2,
                    title: "厨房",
                    titlePicUrl: "../images/images/3.jpg",
                    content: "",
                    threeDimensionalImgInfo: "",
                    support3d: "",
                    extendJson: ""
                } ],
                houses: {
                    name: "国风美仑",
                    provinceName: "",
                    cityName: "北京",
                    room: 3,
                    hall: 2,
                    cook: 1,
                    bathroom: 1,
                    houseImg: "../images/images/3.jpg",
                    houseArea: "100"
                }
            },
            isAddCart: 1,
            isLogin: 1
        };
        //模版加载方式一:简单模版
        isAddCart = result.isAddCart;
        isLogin = result.isLogin;
        var html = template.render("jing-detail-tpl", {
            data: result
        });
        $(".match-detail-page").prepend(html);
        initSlider1();
        getMoreMatch();
    }).fail(function(error) {
        error || (error = {});
        toast(error.msg);
    });
    //京装更多搭配   
    function getMoreMatch() {
        var data = {
            url: HOST_NAME + "/api/jz/recommend.do",
            body: {
                id: articleId
            }
        };
        API_AJAX.jsonp(data).done(function(res) {
            res || (res = {});
            var model = res.model || {};
            var result = model.value || [];
            var result = [ {
                hardcoverId: 1437,
                housesName: "国风美仑",
                houseArea: "103",
                room: 1,
                hall: 3,
                bathroom: 1,
                roomNum: 3,
                recommendType: "同小区同户型",
                title: "北欧风情清新地中海浪漫卧室1",
                titlePicUrl: "../images/images/demo.jpg"
            }, {
                hardcoverId: 1437,
                housesName: "富力尚悦居",
                houseArea: "113",
                room: 3,
                hall: 2,
                bathroom: 1,
                roomNum: 4,
                recommendType: "同小区不同户型",
                title: "北欧风情清新地中海浪漫卧室2",
                titlePicUrl: "../images/images/demo.jpg"
            }, {
                hardcoverId: 1437,
                housesName: "富力尚悦居2",
                houseArea: "143",
                room: 3,
                hall: 2,
                bathroom: 2,
                roomNum: 5,
                recommendType: "同小区不同户型",
                title: "北欧风情清新地中海浪漫卧室3",
                titlePicUrl: "../images/images/demo.jpg"
            } ];
            var tpl = require("../../tpl/page.html");
            var render = template.compile(tpl);
            var html = render({
                data: result
            });
            $(".more-match-box").html(html);
            //$(".more-match-box").html(template.render('more-match-tpl',{data:result}));
            if (isAddCart && isLogin) {
                getCart();
            }
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
    //获取购物车数据
    function getCart() {
        var data = {
            url: HOST_NAME + "/api/jz/getSkusByArticleIds.do",
            body: {
                id: articleId
            }
        };
        API_AJAX.jsonp(data).done(function(res) {
            res || (res = {});
            var model = res.model || {};
            var result = model.value || [];
            result = [ {
                articleId: 1234,
                name: "卧室",
                skuNum: 2,
                articleAssemble: [ {
                    skuId: 3431731,
                    skuImgUrl: "../images/images/designer.png",
                    skuName: "好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示"
                }, {
                    skuId: 1125276,
                    skuImgUrl: "../images/images/designer.png",
                    skuName: "好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示"
                } ]
            }, {
                articleId: 1234,
                name: "客厅",
                skuNum: 2,
                articleAssemble: [ {
                    skuId: 3581605,
                    skuImgUrl: "../images/images/designer.png",
                    skuName: "好事达书柜书架 简约置物架自  木质层架收纳展示"
                }, {
                    skuId: 231407,
                    skuImgUrl: "../images/images/designer.png",
                    skuName: "好好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示好事达书柜书架 简约置物架自  木质层架收纳展示东西"
                } ]
            } ];
            var data2 = {
                url: HOST_NAME + "/api/sales/getSalesContent.do",
                body: {
                    id: articleId
                }
            };
            API_AJAX.jsonp(data2).done(function(promotion) {
                promotion = {
                    SalesPromotion: [ {
                        name: "满100减20，满200减50",
                        type: 1,
                        satisfy: 100,
                        favorable: 20
                    }, {
                        name: "满200减50，满200减50",
                        type: 1,
                        satisfy: 200,
                        favorable: 50
                    } ]
                };
                promotion || (promotion = {});
                var promotionRule = promotion.SalesPromotion || [];
                getPrices(result, promotionRule);
            });
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
    //获取商品价格
    function getPrices(result, promotionRule) {
        var skuIds = [];
        //sku集合
        var skuNum = 0;
        //商品总数量
        var totalPrice = 0;
        //商品总金额
        var priceArr = [];
        $.each(result, function(index1, value1) {
            var temp = value1.articleAssemble || [];
            skuNum = skuNum + value1.skuNum;
            $.each(temp, function(index2, value2) {
                if (value2.skuId) {
                    skuIds.push(value2.skuId);
                }
            });
        });
        $(".collect-box").append(template.render("cart-bottom-tpl", {
            skuNum: skuNum,
            promotionRule: promotionRule
        }));
        $(".pop-cart-box").html(template.render("cart-list-tpl", {
            data: result,
            skuNum: skuNum,
            promotionRule: promotionRule
        }));
        var data = {
            url: "http://pm.3.cn/prices/mgets?area=&origin=2&source=20&",
            body: {
                skuids: skuIds.join(",")
            }
        };
        API_AJAX.jsonp(data).done(function(result) {
            result || (result = []);
            $.each(result, function(index, value) {
                var skuId = value.id;
                var price = parseFloat(value.p);
                //totalPrice = totalPrice + price;
                priceArr.push(price);
                $(".good-price[skuId='" + skuId + "']").find("em").text(value.p);
            });
            //totalPrice = totalPrice.toFixed(2);
            console.log(priceArr);
            totalPrice = countPromotion(priceArr, promotionRule);
            $(".totalPrice").text("¥" + totalPrice);
            console.log(totalPrice);
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
    //计算促销优惠信息
    function countPromotion(arr, promotionRule) {
        if (promotionRule && promotionRule.length) {
            //促销规则入口       
            var sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if (promotionRule[0].type == 1 || promotionRule[0].type == 3) {
                //满减,用sum去匹配最大满减额度
                var promotionNum = 0;
                //先按照额度做个排序
                promotionRule.sort(function(a, b) {
                    return b.satisfy - a.satisfy;
                });
                //从大到小遍历，第一个符合的计算后退出逻辑
                for (i = 0; i < promotionRule.length; i++) {
                    if (sum >= promotionRule[i].satisfy) {
                        promotionNum = promotionRule[i].favorable;
                        break;
                    }
                }
                if (promotionNum > 0) {
                    //2.1提示已经满减，满5000-500，满10000-1000,已省230元
                    $(".promotionPrice").text("(已省¥" + promotionNum.toFixed(2) + ")").show();
                } else {
                    //2.2清空满减提示
                    $(".promotionPrice").text("").hide();
                }
                return (sum - promotionNum).toFixed(2);
            } else {
                //满免，末尾喊价后计算
                arr.sort(function(a, b) {
                    return b - a;
                });
                var count = promotionRule[0].satisfy;
                var pop = promotionRule[0].favorable;
                var pops = 0;
                if (arr.length >= count) {
                    for (var j = 0; j < pop; j++) {
                        pops += arr.pop();
                    }
                    //3.1提示满5免1,
                    $(".promotionPrice").text("(已免" + pop + "件¥" + pops + ")").show();
                } else {
                    //3.2清除满免提示
                    $(".promotionPrice").text("").hide();
                }
                return arr.reduce(function(a, b) {
                    return a + b;
                }).toFixed(2);
            }
        } else {
            //4.没有优惠规则直接计算
            return arr.reduce(function(a, b) {
                return a + b;
            }).toFixed(2);
        }
    }
    function initSlider1() {
        /*第一个轮播图 start*/
        var first = new Swiper(".banner-slider-box", {
            roundLengths: true,
            initialSlide: 0,
            speed: 600,
            slidesPerView: "auto",
            pagination: ".banner-swiper-pagination",
            centeredSlides: true,
            followFinger: true,
            loop: true,
            onInit: function(data) {
                //初始化
                $(".banner-slider-box li").eq(data.activeIndex).addClass("first");
            },
            onSlideChangeStart: function(data) {
                var $current = $(".banner-slider-box li").eq(data.activeIndex);
                $current.addClass("actived").siblings().removeClass("actived first");
                var src = $current.find("img").attr("src");
                var title = $current.find(".title").text();
                var roomId = $current.find(".title").attr("roomId");
                $(".banner-slider-box").css({
                    background: "url(" + src + ") no-repeat",
                    "background-size": "cover"
                });
                $(".banner-slider-box .goto-room").attr({
                    href: "jing-room.html?articleId=" + articleId + "&roomId=" + roomId
                }).find("span").text(title);
            }
        });
    }
    $(".match-detail-page").delegate(".designer-detail .follow", "click", function() {
        $this = $(this);
        var flag = "";
        var writerId = $(this).attr("writerId");
        $(this).hasClass("on") ? flag = false : flag = true;
        var data = {
            url: HOST_NAME + "/api/attention/attentionWriter.do",
            body: {
                writerId: writerId,
                flag: flag
            }
        };
        API_AJAX.jsonp(data).done(function(res) {
            flag ? text = "已关注" : text = "关注TA";
            flag ? msg = "关注成功" : msg = "取消关注成功";
            $this.toggleClass("on").find("em").text(text);
            toast(msg);
        }).fail(function(error) {
            error || (error = {});
            toast("关注失败");
        });
    });
    //查看更多图文详情
    $(".match-detail-page").delegate(".show-more-detail span", "click", function() {
        $(".article-detail").css({
            "max-height": "none"
        });
        $(".show-more-detail").remove();
    });
    //收藏文章
    $(".match-detail-page").delegate(".collect-box .collect-btn", "click", function() {
        $this = $(this);
        var flag = "";
        var articleId = $(this).attr("articleId");
        $(this).hasClass("on") ? flag = 0 : flag = 1;
        if (flag) {
            collectHander(flag, articleId, $this);
        } else {
            dialog({
                title: "确定要取消收藏吗?",
                type: "confirm",
                callback: function() {
                    collectHander(flag, articleId, $this);
                }
            });
        }
    });
    function collectHander(flag, articleId, $this) {
        var data = {
            url: HOST_NAME + "/api/articlePraise/favArticle.do",
            body: {
                flag: flag,
                articleId: articleId
            }
        };
        API_AJAX.jsonp(data).done(function(result) {
            flag ? text = "已收藏" : text = "收藏搭配";
            $this.toggleClass("on").find("em").text(text);
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
    //展开购物车
    $(".match-detail-page").delegate(".collect-box .show-btn", "click", function() {
        //getCart();
        //$("body").addClass("overflowHide");
        $(".collect-box .show-btn").hide().siblings(".hide-btn").show();
        $(".pop-cart-box").removeClass("todown").addClass("toup");
        $(".pop-cart-mask").show();
        $(".pop-cart-box").removeClass("hide");
    });
    //收起购物车
    $(".match-detail-page").delegate(".collect-box .hide-btn", "click", function() {
        //$("body").removeClass("overflowHide");
        $(".collect-box .hide-btn").hide().siblings(".show-btn").show();
        $(".pop-cart-box").removeClass("toup").addClass("todown");
        setTimeout(function() {
            $(".pop-cart-mask").hide();
            $(".pop-cart-box").addClass("hide");
        }, 100);
    });
});
define("../js/tpl/page", [], function(require, exports, module) {
    var source = '<div class="bigImg">' + '<ul class="bigUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li style="background:<%= list[i].color %>;">' + '<div class="ban_cter">' + '<div class="imgBox">' + '<a  class="focusArea" target="_blank" href="javascript:;">' + '<img class="imgAnimate" src="<%= list[i].url %>" width="820" height="470" />' + '<img class="imgText" src="<%= list[i].text %>"/>' + "</a>" + "</div>" + '<div class="mav">' + '<a style="background:url(../images/smallImg.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"><i></i></a>' + '<span class="mask1"></span>' + '<a style="background:url(../images/smallImg2.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"></a>' + '<span class="mask2" ></span>' + "</div>" + "</div>" + "</li>" + "<% } %>" + "</ul>" + "</div>" + '<div class="smallBtn">' + '<ul class="smallUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li class="<% if (i==0) { %>on<% } %>"> <%= i+1 %></li>' + "<% } %>" + "</ul>" + "</div>";
    /*var source = '<ul>'
	+    '<% for (var i = 0; i < list.length; i ++) { %>'
	+        '<li>索引 <%= i + 1 %> ：<%= list[i] %></li>'
	+    '<% } %>'
	+ '</ul>';*/
    return source;
});
define("../js/common/api", [], function(require, exports, module) {
    var API_AJAX = {};
    // 默认为异步GET请求,
    // timeout 超时设置，默认5000ms
    API_AJAX.json = function(data) {
        if (data.body) {
            data.body = JSON.stringify(data.body);
        } else {
            data.body = "{}";
        }
        if (data.async == undefined) {
            data.async = true;
        }
        if (data.cache == undefined) {
            data.cache = true;
        }
        return $.Deferred(function(d) {
            var result = JSON.parse(data.body);
            result.rand = new Date().getTime();
            var xhr = $.ajax({
                url: data.url,
                type: data.type || "GET",
                data: result,
                timeout: data.timeout || 5e3,
                dataType: "json",
                async: data.async,
                cache: data.cache,
                success: function(res, status, xhr) {
                    res || (res = {});
                    if (res.code == 1) {
                        d.resolve(res.data, res);
                    } else {
                        d.reject(res);
                    }
                },
                error: function(error) {
                    d.reject({
                        type: "network",
                        msg: "加载失败，请稍后重试"
                    });
                }
            });
            d.xhr = xhr;
        });
    };
    API_AJAX.jsonp = function(data) {
        if (data.body) {
            data.body = JSON.stringify(data.body);
        } else {
            data.body = "{}";
        }
        if (data.async == undefined) {
            data.async = true;
        }
        return $.Deferred(function(d) {
            var result = JSON.parse(data.body);
            result.rand = new Date().getTime();
            $.ajax({
                async: data.async,
                url: data.url,
                type: "GET",
                data: result,
                dataType: "jsonp",
                jsonp: "callback",
                timeout: data.timeout || 5e3,
                success: function(result) {
                    d.resolve(result);
                },
                error: function(error) {
                    d.reject(error);
                }
            });
        });
    };
    module.exports = API_AJAX;
});
// JavaScript Document
/* 
* cookie  创建和存储 cookie
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/cookie", [], function(require, exports, module) {
    var cookie = {};
    cookie.getCookie = function(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };
    cookie.setCookie = function(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    };
    cookie.checkCookie = function() {
        var username = cookie.getCookie("username");
        if (username != null && username != "") {
            alert("Welcome again " + username + "!");
        } else {
            username = prompt("Please enter your name:", "");
            if (username != null && username != "") {
                cookie.setCookie("username", username, 365);
            }
        }
    };
    module.exports = cookie;
});
// JavaScript Document
/* 
* alert提示
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 参数说明
title：提示标题
type：success（成功）、confirm（确认）、fail（失败）
callback：回调函数，用于confim确认时的回调
*/
define("../js/common/dialog", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    return function dialog(options) {
        var defaults = {
            title: "提示",
            type: "success",
            sureText: "确定",
            cancelText: "取消",
            callback: null
        };
        var option = $.extend(defaults, options);
        if ($(".dialog-box").length) {
            return false;
        }
        var html = '<div class="pop-mask"></div><div class="dialog-box"><p class="title">' + option.title + '</p><div class="dialog-btn"><ul><li class="cancel-btn">' + option.cancelText + '</li><li class="sure-btn">' + option.sureText + "</li></ul></div></div>";
        $(".pop-mask, .dialog-box").remove();
        $("body").append(html);
        $dialog = $(".dialog-box").show();
        $mask = $(".pop-mask").show();
        if ("confirm" == option.type) {
            $dialog.find(".cancel-btn").css({
                display: "inline-block"
            });
        } else {
            $dialog.find(".cancel-btn").css({
                display: "none"
            });
            $dialog.find(".sure-btn").addClass("only-sure-btn");
        }
        var cancelHander = function() {
            $dialog.remove();
            $mask.remove();
        };
        $(".dialog-box .sure-btn").bind("click", function() {
            cancelHander();
            if (option.callback && typeof option.callback == "function") {
                option.callback();
                if (option.type == "confirm") {
                    option.callback = null;
                }
            }
        });
        $(".dialog-box .cancel-btn").bind("click", function() {
            cancelHander();
            option.callback = null;
        });
    };
});
// JavaScript Document
/* 
* H5定位
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/getLocation", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    /*
     朝林广场ios定位 {"coord_type":"2","longitude":"116.505674","latitude":"39.793242"}
     朝林广场Safari定位发送 {"longitude":116.49971450626151,"latitude":39.79195208558683,"coord_type":"
     */
    // 参数checkLocal表示若本地存在缓存，则使用本地缓存. 若为false，则强制重新设备位置
    return function getLocation() {
        return $.Deferred(function(d) {
            // 太小经常会在第一次进入页面时报告定位失败，手动点击一下又可以获取到定位，
            // 之前未出现过这种情况，猜测可能是初始时时间太短(500毫秒时会出现)
            // 也可能是因为
            // timeout时间值的设定：
            // 在ios设备上，几乎总是在500ms内便可获取到gps，
            // 但在有些android机上，1600ms会导致因过早终止而获取不到，
            // 因此保守的设置为5000ms
            if (navigator && navigator.geolocation) {
                // 20s后，无论用户是否点击了弹出框中的"允许""不允许"，都reject()一次
                // 需要注意的是，弹框显示的过程中，等待的时间也计算在内
                // 详情查看http://jira.jd.com/browse/OO-13493
                setTimeout(function() {
                    d.reject();
                }, 2e4);
                try {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var coords = (position || {}).coords;
                        if (isValidCoords(coords)) {
                            //getLocation.savedCoords_ = coords;
                            //sessionstore.setItem(key,coords);
                            d.resolve(coords);
                        } else {
                            d.reject();
                        }
                    }, function(error) {
                        //d.resolve(error);
                        d.reject(error);
                    }, {
                        enableHighAcuracy: true,
                        timeout: 5e3,
                        maximumAge: 3e3
                    });
                } catch (e) {
                    d.reject(e);
                }
            } else {
                d.reject();
            }
        });
    };
});
// JavaScript Document
/* 
* 上拉翻页，加载更多
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/getMore", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    return function getMore(moreHander, item) {
        clearInterval(moreTime);
        var moreTime = window.setInterval(function() {
            checkHander();
        }, 125);
        function checkHander() {
            var $allItem = $(item);
            var len = $allItem.length;
            if (len < 4) {
                return false;
            }
            //当倒数第二个元素浮出水面时，加载更多
            var $lastItem = $allItem[len - 2];
            if ($lastItem) {
                var rect = $lastItem.getBoundingClientRect();
                var windowHeight = $(window).height() || 480;
                //对于获取不到屏幕高度的浏览器，默认为480
                var top = rect.top;
                var width = rect.width;
                // 如果最后一个元素已经浮出水面，则加载更多
                if (width > 0 && top < windowHeight + 100) {
                    moreHander && moreHander();
                }
            }
        }
    };
});
// JavaScript Document
/* 
* 返回顶部
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/goTop", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    return function goTop() {
        clearInterval(time);
        var $goTop = $(".go-top");
        var time = setInterval(function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 400) {
                $goTop.show();
            } else {
                $goTop.hide();
            }
        }, 500);
        $goTop.bind("click", function() {
            $goTop.hide();
            $(window).scrollTop(0);
        });
    };
});
/*demo
helper.js 函数命名规则 $functionName,和普通函数区分

template.helper('$twoDecimalPlaces',function(money){
	return twoDecimalPlaces(money);
});*/
define("../js/common/helper", [ "template" ], function(require, exports, module) {
    var template = require("template");
    template.helper("$getWinHeight", function() {
        return window.innerHeight;
    });
    template.helper("$halfWinWidth", function() {
        return window.innerWidth * .5;
    });
    return template;
});
// JavaScript Document
/* 
* loadjs  加载js文件
* 
*/
define("../js/common/loadjs", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    // 同一个js只会加载一次，区别方式为src
    // 也就是说同一个src，不同的attributes，只会加载第一次
    return function loadjs(src, attributes) {
        if (loadjs[src]) {
            if (loadjs[src].done) {
                return $.Deferred(function(d) {
                    d.resolve();
                });
            } else if (loadjs[src].loading) {
                return loadjs[src].Deferred;
            }
        }
        loadjs[src] = {
            loading: true,
            Deferred: $.Deferred(function(d) {
                var s = document.createElement("script");
                s.src = src;
                if (attributes && _.isObject(attributes)) {
                    for (var name in attributes) {
                        s.setAttribute(name, attributes[name]);
                    }
                }
                s.onload = function() {
                    loadjs[src].done = true;
                    loadjs[src].loading = false;
                    loadjs[src].Deferred = null;
                    d.resolve();
                };
                s.onerror = function() {
                    loadjs[src] = null;
                    d.reject();
                };
                var p = document.getElementsByTagName("head")[0];
                p.appendChild(s);
            })
        };
        return loadjs[src].Deferred;
    };
});
// JavaScript Document
/* 
* toast提示
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define("../js/common/toast", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    //var toast = {};
    return function toast(text, showIn) {
        var $toast = $(".toast-msg");
        //var $mask = $('.pop-mask');
        if ($toast.length != 0 || !text) {
            return false;
        }
        var showIn = showIn || 2e3;
        // 显示时间
        /*if($mask.length == 0){
                    var mask = document.createElement('div');
                    mask.className = 'pop-mask';
                    document.body.appendChild(mask);
                }*/
        var toastDom = document.createElement("div");
        toastDom.className = "toast-msg";
        toastDom.innerHTML = text;
        document.body.appendChild(toastDom);
        //var $mask = $('.pop-mask')
        var $toast = $(".toast-msg");
        //$mask.show();
        $toast.show();
        setTimeout(function() {
            //$mask.remove();
            $toast.remove();
        }, showIn);
    };
});
// JavaScript Document
define("../js/common/utility", [], function(require, exports, module) {
    var utility = {};
    /*常用函数*/
    utility.currentUrl = location.protocol + "//" + location.host + location.pathname;
    //校验手机号码
    utility.isMobile = function(str) {
        return /^0?1(3|4|5|7|8)\d{9}$/.test((str || "").toString().trim());
    };
    /*获取浏览器信息*/
    utility.getUserAgent = function() {
        var ua = navigator.userAgent || "";
        return ua.toLowerCase();
    };
    utility.parseInt_10 = function(a) {
        return parseInt(a, 10);
    };
    utility.parseFloat_10 = function(a) {
        return parseFloat(a, 10);
    };
    // 当有不合法的json字符串传入时，返回空
    utility.JSONparse = function(str) {
        if (typeof str !== "string") {
            return "";
        }
        try {
            return JSON.parse(str);
        } catch (e) {
            return "";
        }
    };
    utility.getTime = function() {
        return new Date().getTime();
    };
    // 包含from,不包含to
    utility.random = function(from, to) {
        return from + Math.floor(to * Math.random());
    };
    //将url上的参数转为一个对象
    utility.parseQueryString = function() {
        var reslut = {};
        var str = location.search.substring(1);
        var temp = str.split("&");
        var length = temp.length;
        for (var i = 0; i < length; i++) {
            var key = temp[i].split("=");
            reslut[key[0]] = key[1];
        }
        return reslut;
    };
    /**
     * [regEmoji 非表情符号验证正则表达式 表情符号为4字节字符，长度为2，从D800-DBFF开头的]
     * @type {RegExp}
     * (这些特殊字符为表情符号)返回 false
     * 其它文字都返回 true
     */
    utility.checkRegEmoji = function(str) {
        return /^[^\uD800-\uDBFF]+$/.test((str || "").toString().trim());
    };
    //获取cookie
    utility.getCookie = function(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };
    //设置cookie
    utility.setCookie = function(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    };
    //删除cookie
    utility.deleteCookie = function(name, value, expiredays) {};
    //时间戳转为时分秒
    utility.houMinSec = function(time) {
        var hh = parseInt(time / (60 * 60));
        var ss = parseInt(time % 60);
        var mm = parseInt((time - hh * 60 * 60) / 60);
        var result = {
            hh: checkTime(hh),
            mm: checkTime(mm),
            ss: checkTime(ss)
        };
        return result;
    };
    function checkTime(i) {
        var i = utility.parseInt_10(i);
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    /*32位随机码*/
    utility.createCode = function() {
        var code = "";
        var codeLength = 6;
        //验证码的长度
        var checkCode = document.getElementById("checkCode");
        var selectChar = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
        //所有候选组成验证码的字符，当然也可以用中文的
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += selectChar[charIndex];
        }
        return code;
    };
    /**
     * 替换sessionStorage
     * 替换目的： 防止iPhone Safari无痕模式使用本地存储时报错；统一进行JSON.stringify()序列化，减少使用时的代码输入
     */
    var sessionStorageEnabled = false;
    try {
        sessionStorage.setItem("1", "1");
        sessionStorageEnabled = true;
    } catch (e) {}
    var sessionstore = {
        data: {},
        getItem: function(key) {
            if (sessionStorageEnabled) {
                return utility.JSONparse(sessionStorage.getItem(key));
            } else {
                return sessionstore.data[key];
            }
        },
        setItem: function(key, value) {
            if (sessionStorageEnabled) {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                sessionstore.data[key] = value;
            }
        },
        removeItem: function(key) {
            if (sessionStorageEnabled) {
                sessionStorage.removeItem(key);
            } else {
                delete sessionstore.data[key];
            }
        }
    };
    utility.sessionstate = sessionstore;
    //判断是否是JDAPP
    utility.isJDApp = function() {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = agentData[0].toLowerCase() == "jdapp";
        return result;
    };
    //判断是否是ios的JDAPP
    utility.isJDios = function() {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = "";
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "iphone";
        }
        return result;
    };
    //判断是否是android的JDAPP
    utility.isJDandroid = function() {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = "";
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "android";
        }
        return result;
    };
    // 判断浏览器是否支持sticky属性
    function isSupportSticky() {
        var prefixTestList = [ "", "-webkit-", "-ms-", "-moz-", "-o-" ];
        var stickyText = "";
        for (var i = 0; i < prefixTestList.length; i++) {
            stickyText += "position:" + prefixTestList[i] + "sticky;";
        }
        // 创建一个dom来检查
        var div = document.createElement("div");
        var body = document.body;
        div.style.cssText = "display:none;" + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    }
    //调用sticky方法
    utility.stickyDom = function(obj) {
        var stickyTime;
        /*滚动的循环变量*/
        if (!obj) {
            return false;
        }
        var normalDom = obj.normalDom.get(0);
        var fixedDom = obj.fixedDom.get(0);
        var fixedTop = obj.fixedTop || 0;
        if (!obj.normalDom || !obj.fixedDom || normalDom.length == 0 || fixedDom.length == 0) {
            return false;
        }
        if (isSupportSticky()) {
            normalDom.className = normalDom.className + " sticky";
        } else {
            clearInterval(stickyTime);
            stickyTime = setInterval(function() {
                var rect = normalDom.getBoundingClientRect();
                var top = rect.top;
                if (top <= fixedTop) {
                    fixedDom.style.display = "block";
                    normalDom.style.opacity = 0;
                } else {
                    fixedDom.style.display = "none";
                    normalDom.style.opacity = 1;
                }
            }, 100);
        }
    };
    // Style properties  //#here : vendor + 参数(将第1个字符转换为大写)
    /*    transform = prefixStyle('transform'),  // webkitTransform
    transition = prefixStyle('transition'),  // webkitTransform

// Browser capabilities
    navigator_appVersion = navigator.appVersion,
    isAndroid = (/android/gi).test(navigator_appVersion),
    isIOS = (/iPhone|iPad/gi).test(navigator_appVersion),
    isIOS8 = isIOS && (/OS 8/i).test(navigator_appVersion),
    isIOS9 = isIOS && (/OS 9/i).test(navigator_appVersion),
    isMobileQQ = (/QQ\/([\d.]+)/gi).test(navigator_appVersion),
    isUCBrowser = (/UCBrowser/gi).test(navigator_appVersion),
    isMeiZu = isAndroid && (/\bM(\d)+\s*Build/gi).test(navigator_appVersion),


    isWin = (/Windows/gi).test(navigator_appVersion),
    isMAC = (/Mac/gi).test(navigator_appVersion),
    isLinux = (/Linux/gi).test(navigator_appVersion),
    isWindowsPhone = /(?:Windows Phone)/.test(navigator_appVersion),
    isSymbian = /(?:SymbianOS)/.test(navigator_appVersion) || isWindowsPhone,
    isFireFox = /(?:Firefox)/.test(navigator_appVersion),
    isTablet = /(?:iPad|PlayBook)/.test(navigator_appVersion)||(isFireFox && /(?:Tablet)/.test(navigator_appVersion)),
    isPc = !isIOS && !isAndroid && !isSymbian,


// 微信
    isWeixin = (/MicroMessenger/gi).test(navigator_appVersion),
    isWeixinService = isWeixin;*/
    module.exports = utility;
});