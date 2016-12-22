
define(function(require) {
	seajs.use(['../static/src/js/lazyload.js','../static/src/js/public.js','../static/src/js/index.js'],function(){
	    //alert("666")
	});

	seajs.use(['jquery','../static/src/js/slider_1.js','../static/src/js/slider_2.js'],function($){
	    $(".mainBanner").slider_1();
	    $(".bannerSlier,.floorSlider").slider_2();
	    
	});

});