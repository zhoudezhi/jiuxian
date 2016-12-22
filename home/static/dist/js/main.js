
define("../static/dist/js/init",function(require) {
	seajs.use(['../static/dist/js/lazyload.js','../static/dist/js/public.js','../static/dist/js/index.js'],function(){
	    //alert("666")
	});

	seajs.use(['jquery','../static/dist/js/slider_1.js','../static/dist/js/slider_2.js'],function($){
	    $(".mainBanner").slider_1();
	    $(".bannerSlier,.floorSlider").slider_2();
	});
});