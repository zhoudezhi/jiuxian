define("../js/common/share", [ "utility", "jdShare" ], function(require, exports, module) {
    var share = {};
    var utility = require("utility");
    share.shareFromApp = function(data) {
        data || (data = {});
        if (utility.isJDApp()) {
            var jdShare = require("jdShare");
            jdShare.setShareInfo({
                title: data.title || "京东家",
                content: data.content || "装修难不倒，家具如何挑，厨具用品哪些好，京东家问答能够解决你的这些问题。",
                url: "https://ihome.m.jd.com/jdj-m/ihome.html#" + (data.url || "index"),
                img: data.img || "https://misc.360buyimg.com/business/jdj-m/images/share.jpg",
                channel: "",
                callback: null,
                clickcallback: null,
                qrparam: null,
                timeline_title: ""
            });
        }
    };
    share.weixinShare = function(data) {};
    module.exports = share;
});