// JavaScript Document
/* 
 * Name：getMore 上拉加载更多
 * Date: 2017-05-20
 */
define(function (require, exports, module) {
    return function getMore(moreHander, item) {
        clearInterval(moreTime);
        var moreTime = window.setInterval(function () {
            checkHander();
        }, 200);

        function checkHander() {
            var allItem = document.querySelectorAll(item);
            var len = allItem.length;
            if (len < 4) {
                return false;
            }
            //当倒数第二个元素浮出水面时，加载更多
            var lastItem = allItem[len - 2];
            if (lastItem) {
                var rect = lastItem.getBoundingClientRect();
                var windowHeight = window.screen.height || 568;//对于获取不到屏幕高度的浏览器，默认为568
                var top = rect.top;
                var width = rect.width;
                // 如果最后一个元素已经浮出水面，则加载更多
                //console.log($(document).height())
                if (width > 0 && top < windowHeight + 100) {
                    moreHander && moreHander();
                }
            }
        }
    }

})


