define("../js/common/getMore", [], function(require, exports, module) {
    return function getMore(moreHander, item) {
        clearInterval(moreTime);
        var moreTime = window.setInterval(function() {
            checkHander();
        }, 200);
        function checkHander() {
            var allItem = document.querySelectorAll(item);
            var len = allItem.length;
            if (len < 4) {
                return false;
            }
            var lastItem = allItem[len - 2];
            if (lastItem) {
                var rect = lastItem.getBoundingClientRect();
                var windowHeight = window.screen.height || 568;
                var top = rect.top;
                var width = rect.width;
                if (width > 0 && top < windowHeight + 100) {
                    moreHander && moreHander();
                }
            }
        }
    };
});