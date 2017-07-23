// JavaScript Document


require(["fastclick", "zepto", "helper", "cookie", "toast", "api"], function (fastclick, $, helper, cookie, toast, api) {
    fastclick(document.body); //页面注册快速点击事件
    //var template = require("template");
    //cookie.checkCookie();
    //var errorTpl = require("../../../html/error.tpl");
    //var render = template.compile(errorTpl);
    //var html = render({msg: '加载失败'});
    //$(".match-detail-page").html(html);
    var HOST_NAME = "http://homeapi.jd.com";
    var articleDate = {
        url: HOST_NAME + "/api/jz/hardcoverDetail.do",
        body: {
            id: 91914,
            type: 1
        },
        async: false
    };
    api.jsonp(articleDate).done(function (res) {
    }).fail(function (error) {

    });


    $("body").click(function () {
        toast("toast提示")

    });


});

