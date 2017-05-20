// JavaScript Document
/* 
* Name: slider_1
* Copyright: 某年某月 
* Date: 2014-12-16 
* Description: 渐隐渐现轮播插件 v1.0  
* Funtion: 左右按钮、数字按钮、自动播放、显隐切换 
*/
define("../js/common/slider_1", [ "jquery" ], function(require, exports, module) {
    var $ = require("jquery");
    $.fn.slider_1 = function(options) {
        var defaults = {
            speed: 300,
            //图片切换 动画时间
            pausetime: 4e3,
            // 图片切换 动画间隔
            autoplay: true,
            //默认是否自动执行动画
            trigger: "mouseenter"
        };
        var option = $.extend(defaults, options);
        return this.each(function() {
            var $this = $(this);
            var $prevBtn = $this.find(".prevPage");
            var $nextBtn = $this.find(".nextPage");
            var $bigUl = $this.find(".bigUl");
            var $smallUl = $this.find(".smallUl");
            var $numBtn = $smallUl.find("li");
            var sliderLength = $bigUl.find("li").length;
            var currentPage = 0;
            var time = null;
            var index = 1;
            $bigUl.find("li:first").css({
                "z-index": "1"
            }).addClass("on");
            /*显隐切换函数*/
            function hander() {
                index++;
                //var prevPage = $numBtn.index($smallUl.find("li[class=on]"));
                $bigUl.find("li").removeClass("on").stop(true, true);
                $bigUl.find("li").eq(currentPage).css({
                    opacity: "0",
                    "z-index": index
                }).addClass("on").stop(true, true).animate({
                    opacity: "1"
                }, option.speed);
                $numBtn.eq(currentPage).addClass("on").siblings().removeClass("on");
            }
            /*下一张事件*/
            $nextBtn.bind("click", function() {
                currentPage++;
                if (currentPage == sliderLength) {
                    currentPage = 0;
                }
                hander();
            });
            /*上一张事件*/
            $prevBtn.bind("click", function() {
                currentPage--;
                if (currentPage < 0) {
                    currentPage = sliderLength - 1;
                }
                hander();
            });
            /*数字按钮事件*/
            $numBtn.bind(option.trigger, function() {
                var index = $numBtn.index($(this));
                if (currentPage == index) {
                    return false;
                }
                currentPage = index;
                hander();
            });
            /*自动播放函数*/
            function autoPlayFun() {
                time = setInterval(function() {
                    currentPage++;
                    if (currentPage == sliderLength) {
                        currentPage = 0;
                    }
                    hander();
                }, option.pausetime);
            }
            /*鼠标移入移出事件*/
            $this.bind("mouseenter", function() {
                if (option.autoplay) {
                    clearInterval(time);
                }
                $prevBtn.show();
                $nextBtn.show();
            });
            $this.bind("mouseleave", function() {
                if (option.autoplay) {
                    clearInterval(time);
                    autoPlayFun();
                }
                $prevBtn.hide();
                $nextBtn.hide();
            });
            /*判断是否调用自动播放函数*/
            if (option.autoplay) {
                autoPlayFun();
            }
        });
    };
});