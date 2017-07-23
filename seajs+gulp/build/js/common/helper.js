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