// JavaScript Document
/* 
* zoom 1.0
* Copyright (c) 2013 某年某月  
* Date: 2013-05-05
* 使用zoom可以方便实现图片的放大镜效果
* 注意事项：包裹img的父元素须为相对定位relative
*/

(function($) {
    $.fn.zoom = function(options) {
        var defaults = {
            width: 200,     //放大图的zoomdiv宽度
            height: 200,   //放大图的zoomdiv高度
            left: 20,      //放大图距离原图的水平距离
		    z_width:100,   //蒙板jqZoomPup的宽度
			z_height:100  //蒙板jqZoomPup的高度
			
        }
        var options = $.extend(defaults, options);
		
        return this.each(function() {
			
            $(this).hover(function() {
				
                var imgwidth = $(this).children("img").eq(0).width();
				
                var imgheight = $(this).children("img").eq(0).height();
				
                var imgleft = $(this).offset().left;
				
                var imgtop = $(this).offset().top;
				
                var smallsrc = $(this).children("img").attr("src");
				
                var bigsrc = $(this).children("img").attr("jqimg");
				
                $(this).after('<div class="zoomdiv"><img src="' + bigsrc + '"/></div>');
				
                $(this).append('<div class="jqZoomPup"></div>');

                var bigimgleft = imgwidth + imgleft + options.left;
				
                var bigimgtop = imgtop;
				
                $(this).css('cursor', 'pointer');

                $(".zoomdiv").width(options.width);
				
                $(".zoomdiv").height(options.height);
				
			    $(".zoomdiv").css({
                    left: bigimgleft,
                    top: bigimgtop
                });
				
                $(".jqZoomPup").css('visibility', 'visible');
				
				$(".jqZoomPup").width(options.z_width);
				
				$(".jqZoomPup").height(options.z_height);
				
                $(".zoomdiv").show();
				
                $(this).mousemove(function(e) {

                    mouse = new MouseEvent(e);

                    var bigwidth = $(".zoomdiv").children("img").eq(0).width();

                    var bigheight = $(".zoomdiv").children("img").eq(0).height();

                    var scaley = mouse.x;

                    var scalex = mouse.y;

                    var scalex = (bigwidth / imgwidth);

                    var scaley = (bigheight / imgheight);

                    xpos = mouse.x - $(".jqZoomPup").width() / 2 - imgleft;
                    if (xpos < 0) {
                        xpos = 0;
                    }
                    if (xpos > imgwidth - $(".jqZoomPup").width()) {
                        xpos = imgwidth - $(".jqZoomPup").width()
                    }

                    ypos = mouse.y - $(".jqZoomPup").height() / 2 - imgtop;
                    if (ypos < 0) {
                        ypos = 0;
                    }
                    if (ypos > imgheight - $(".jqZoomPup").height()) {
                        ypos = imgheight - $(".jqZoomPup").height();
                    }

                    $(".jqZoomPup").css({
                        top: ypos,
                        left: xpos
                    });

                    scrolly = ypos;

                    $(".zoomdiv").scrollTop(scrolly * scaley); 

                    scrollx = xpos;

                    $(".zoomdiv").scrollLeft(scrollx * scalex);

                });

            },
            function() {
                $(this).unbind("mousemove");

                $(".jqZoomPup").remove();

                $(".zoomdiv").remove();

            })

        })

    }
})(jQuery);

function MouseEvent(e) {
    this.x = e.pageX;
    this.y = e.pageY;

}