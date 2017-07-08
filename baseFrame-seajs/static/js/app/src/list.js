// JavaScript Document
define(function (require, exports, module) {
    var attachFastClick = require('fastclick');
    attachFastClick(document.body);  //页面注册快速点击事件
    var $ = require('zepto');
    var template = require('template');
    var api = require('api');
    var toast = require('toast');
    require('helper');
    var goTop = require('goTop');
    var getMore = require("getMore");
    var utility = require('utility');
    var share = require('share');

    var pageNumber1 = pageNumber2 = pageNumber3 = 1;
    var hasNextPage1 = hasNextPage2 = hasNextPage3 = true;
    var isLoading1 = isLoading2 = isLoading3 = false;
    var pageSize = 10;
    var HOST_NAME = '//ihome.m.jd.com';
    $(".list-page").html(template.render('loading-page-tpl', {loading: true}));
    goTop();

    share.shareFromApp({
        title: "京东家-问答",
        content: "每个人在装修前都很迷茫，这里，能够解决你的困惑。",
        url: "questionList",
        img: "https://misc.360buyimg.com/business/jdj-m/images/share2.jpg"
    });
    //tab切换
    $("body").delegate(".question-type-box li", "click", function (e) {
        var $target = $(e.currentTarget);
        var index = $target.index();
        $(".question-list-type li").eq(index).addClass("on").siblings().removeClass("on");
        $(".question-list-type-fixed li").eq(index).addClass("on").siblings().removeClass("on");
        $(".question-list>div").hide();
        $(".question-list>div").eq(index).show();
        var height = $(".question-banner").height();
        if (index === 1 && $(".question-list-hot li").length === 0) {
            getHotList();
            //切换时，导航条保持在固定位置
            $(window).scrollTop(height);
        } else if (index === 2 && $(".question-list-useful li").length === 0) {
            getUsefulList();
            $(window).scrollTop(height);
        }
    });
    getNewQuestion();
    getMore(more1, '.question-list-new li');
    getMore(more2, '.question-list-hot li');
    getMore(more3, '.question-list-useful li');


    //加载更多
    function more1() {
        console.log(1);
        if (hasNextPage1 && !isLoading1) {
            pageNumber1++;
            getNewList();
        }
    }

    //加载更多
    function more2() {
        console.log(2);
        if (hasNextPage2 && !isLoading2) {
            pageNumber2++;
            getHotList();
        }
    }

    //加载更多
    function more3() {
        console.log(3);
        if (hasNextPage3 && !isLoading3) {
            pageNumber3++;
            getUsefulList();
        }
    }

    function getNewQuestion() {
        var data = {
            url: HOST_NAME + "/qaList/newestQuestion"
        };
        api.json(data).done(function (result) {
            result || (result = {});
            var html = template.render('question-list-tpl', {result: result});
            $('.list-page').html(html);
            getNewList();
            utility.stickyDom({
                normalDom: $(".question-list-type"),
                fixedDom: $(".question-list-type-fixed")
            });
        }).fail(function (error) {
            error || (error = {});
            toast(error.msg);
            window.location.href="error.html"
        });
    }

    //获取最新问答
    function getNewList() {
        if (isLoading1 || !hasNextPage1) {
            return false;
        }
        isLoading1 = true;
        var data = {
            type: 1,
            page: pageNumber1,
            pageSize: pageSize
        };
        getQAList(data, callback);
        function callback(result) {
            //在第一个插入活跃回答者
            if (pageNumber1 === 1) {
                recommentInvite();
            }
            if (pageNumber1 === 1 && result.length < pageSize) {
                $(".question-list-new .load-more-status").hide();
            }
            if (pageNumber1 === 1 && result.length === 0) {
                //如果没有内容，就加载空模版
                $(".question-list-new").html(template.render("qa-list-empty-tpl", {}));
                isLoading1 = false;
                return false;
            }
            if (result.length === 0) {
                hasNextPage1 = false;
                $(".question-list-new .load-more-status").removeClass("show-status").text("已经到底啦");
                return false;
            }
            $(".question-list-new ul").append(template.render("question-item-tpl", {result: result}));

            isLoading1 = false;
        }
    }


    //获取热门问答
    function getHotList() {
        if (isLoading2 || !hasNextPage2) {
            return false;
        }
        isLoading2 = true;
        var data = {
            type: 2,
            page: pageNumber2,
            pageSize: pageSize
        };
        getQAList(data, callback);
        function callback(result) {
            if (pageNumber2 === 1 && result.length < pageSize) {
                $(".question-list-hot .load-more-status").hide();
            }
            if (pageNumber2 === 1 && result.length === 0) {
                //如果没有内容，就加载空模版
                $(".question-list-hot").html(template.render("qa-list-empty-tpl", {}));
                isLoading2 = false;
                return false;
            }
            if (result.length === 0) {
                hasNextPage2 = false;
                $(".question-list-hot .load-more-status").removeClass("show-status").text("已经到底啦");
                return false;
            }
            $(".question-list-hot ul").append(template.render("question-item-tpl", {result: result}));
            isLoading2 = false;
        }
    }

    function getQAList(data, callback) {
        var data = {
            url: HOST_NAME + '/qaList/qaList',
            body: {
                type: data.type,
                page: data.page,
                size: data.pageSize
            }
        };
        api.json(data).done(function (result) {
            result || (result = []);
            callback(result);
        }).fail(function (error) {
            error || (error = {});
            toast(error.msg);
        });
    }

    //获取有用问答
    function getUsefulList() {
        if (isLoading3 || !hasNextPage3) {
            return false;
        }
        isLoading3 = true;
        var data = {
            type: 3,
            page: pageNumber3,
            pageSize: pageSize
        };
        getQAList(data, callback);
        function callback(result) {
            if (pageNumber3 === 1 && result.length < pageSize) {
                $(".question-list-useful .load-more-status").hide();
            }
            if (pageNumber3 === 1 && result.length === 0) {
                //如果没有内容，就加载空模版
                $(".question-list-useful").html(template.render("qa-list-empty-tpl", {}));
                isLoading3 = false;
                return false;
            }
            if (result.length === 0) {
                hasNextPage3 = false;
                $(".question-list-useful .load-more-status").removeClass("show-status").text("已经到底啦");
                return false;
            }
            $(".question-list-useful ul").append(template.render("question-item-tpl", {result: result}));
            isLoading3 = false;
        }
    }


    //获取活跃回答者
    function recommentInvite() {
        var data = {
            url: HOST_NAME + '/qaList/activeResponsers'
        };
        api.json(data).done(function (result) {
            result || (result = []);
            $(".question-list-new li").eq(4).after(template.render("invite-question-tpl", {result: result}))
        }).fail(function (error) {
            //error || (error = {});
            //msg(error.msg);  推荐获取失败，不提示
        });
    }

});

