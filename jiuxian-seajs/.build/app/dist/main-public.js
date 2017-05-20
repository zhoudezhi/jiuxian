define("../js/app/dist/main-public", [ "../src/public.js", "zepto", "../../common/api", "../../common/utility", "../../common/toast", "jquery", "../../common/getLocation", "../../common/dialog" ], function(require, exports, module) {
    require("../src/public");
    var API_AJAX = require("../../common/api");
    var utility = require("../../common/utility");
    var toast = require("../../common/toast");
    var getLocation = require("../../common/getLocation");
    require("../../common/dialog");
    $.showDialog({
        title: "标题提示",
        type: "confirm",
        callback: function() {
            callBack();
        }
    });
    function callBack() {
        toast.msg("成功回调");
    }
    getLocation.getLocation().done(function(result) {
        toast.msg(result);
    }).fail(function(error) {
        toast.msg(error.message);
    });
    //var a = utility.checkRegEmoji("zhoudezhi")
    //debugger
    var data = {
        url: "http://bundlingsale.jd.com/json/bundlingSaleConsignee/getNameById.action",
        body: {
            provinceId: 1,
            cityId: 72,
            countyId: 2839
        }
    };
    API_AJAX.json_ajax(data).done(function(result) {
        console.log(result);
    }).fail(function(error) {
        console.log(error);
    });
    var data1 = {
        url: "https://p.3.cn/prices/mgets",
        body: {
            skuIds: "J_1679083129",
            type: 1
        },
        async: false
    };
    API_AJAX.jsonp_ajax(data1).done(function(result) {
        console.log(result);
    }).fail(function(error) {
        console.log(error);
    });
});