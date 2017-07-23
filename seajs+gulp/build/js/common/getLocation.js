define("../js/common/getLocation", [ "zepto" ], function(require, exports, module) {
    var $ = require("zepto");
    return function getLocation() {
        return $.Deferred(function(d) {
            if (navigator && navigator.geolocation) {
                setTimeout(function() {
                    d.reject();
                }, 2e4);
                try {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var coords = (position || {}).coords;
                        d.resolve(coords);
                    }, function(error) {
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