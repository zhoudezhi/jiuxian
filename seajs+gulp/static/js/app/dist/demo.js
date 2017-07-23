define("../js/app/dist/demo", [ "fastclick", "zepto", "helper", "cookie", "../../../html/error.tpl" ], function(require, exports, module) {
    var attachFastClick = require("fastclick");
    attachFastClick(document.body);
    var $ = require("zepto");
    require("helper");
    var cookie = require("cookie");
    var errorTpl = require("../../../html/error.tpl");
    var render = template.compile(errorTpl);
    var html = render({
        msg: "加载失败"
    });
    $(".match-detail-page").html(html);
    $("body").click(function() {
        require.async("toast", function(toast) {
            toast("toast提示");
        });
    });
});