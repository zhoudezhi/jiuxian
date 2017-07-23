define("../js/app/dist/index", [ "fastclick", "zepto", "template", "helper", "api", "utility", "swiper", "dialog", "toast", "goTop", "loadjs", "md5", "jdShare", "../../tpl/page", "templateNative" ], function(require, exports, module) {
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
    var jdShare = require("jdShare");
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
            var tpl = require("../../tpl/page");
            var templateNative = require("templateNative");
            var render = templateNative.compile(tpl);
            var html = render({
                data: result
            });
            $(".more-match-box").html(html);
            if (isAddCart && isLogin) {
                getCart();
            }
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
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
    function getPrices(result, promotionRule) {
        var skuIds = [];
        var skuNum = 0;
        var totalPrice = 0;
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
                priceArr.push(price);
                $(".good-price[skuId='" + skuId + "']").find("em").text(value.p);
            });
            totalPrice = countPromotion(priceArr, promotionRule);
            $(".totalPrice").text("¥" + totalPrice);
        }).fail(function(error) {
            error || (error = {});
            toast(error.msg);
        });
    }
    function countPromotion(arr, promotionRule) {
        if (promotionRule && promotionRule.length) {
            var sum = arr.reduce(function(a, b) {
                return a + b;
            });
            if (promotionRule[0].type == 1 || promotionRule[0].type == 3) {
                var promotionNum = 0;
                promotionRule.sort(function(a, b) {
                    return b.satisfy - a.satisfy;
                });
                for (i = 0; i < promotionRule.length; i++) {
                    if (sum >= promotionRule[i].satisfy) {
                        promotionNum = promotionRule[i].favorable;
                        break;
                    }
                }
                if (promotionNum > 0) {
                    $(".promotionPrice").text("(已省¥" + promotionNum.toFixed(2) + ")").show();
                } else {
                    $(".promotionPrice").text("").hide();
                }
                return (sum - promotionNum).toFixed(2);
            } else {
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
                    $(".promotionPrice").text("(已免" + pop + "件¥" + pops + ")").show();
                } else {
                    $(".promotionPrice").text("").hide();
                }
                return arr.reduce(function(a, b) {
                    return a + b;
                }).toFixed(2);
            }
        } else {
            return arr.reduce(function(a, b) {
                return a + b;
            }).toFixed(2);
        }
    }
    function initSlider1() {
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
            toast(error.msg);
        });
    });
    $(".match-detail-page").delegate(".show-more-detail span", "click", function() {
        $(".article-detail").css({
            "max-height": "none"
        });
        $(".show-more-detail").remove();
    });
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
    $(".match-detail-page").delegate(".collect-box .show-btn", "click", function() {
        $(".collect-box .show-btn").hide().siblings(".hide-btn").show();
        $(".pop-cart-box").removeClass("todown").addClass("toup");
        $(".pop-cart-mask,.pop-cart-box").show();
    });
    $(".match-detail-page").delegate(".collect-box .hide-btn", "click", function() {
        $(".collect-box .hide-btn").hide().siblings(".show-btn").show();
        $(".pop-cart-box").removeClass("toup").addClass("todown");
        setTimeout(function() {
            $(".pop-cart-mask,.pop-cart-box").hide();
        }, 100);
    });
});