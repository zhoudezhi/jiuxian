define("../js/app/dist/error", [ "fastclick", "zepto", "template", "helper" ], function(require, exports, module) {
    var attachFastClick = require("fastclick");
    attachFastClick(document.body);
    var $ = require("zepto");
    var template = require("template");
    require("helper");
    var html = template.render("error-page-tpl", {
        msg: ""
    });
    $("body").html(html);
});