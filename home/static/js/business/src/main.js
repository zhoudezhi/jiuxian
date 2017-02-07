
define(function(require, exports, module) {
	//方案一优于方案二，seajs.use原则只应该有一处，用于引用入口js文件。其他地方应用require来加载模块。
	//方法一
	var $ = require('jquery');
	require('../src/lazyload.js');  
	require('../src/public.js');
	require('../src/index.js');

	//require异步加载
	require.async(['../src/slider_1.js','../src/slider_2.js'],function(){
		$(".mainBanner").slider_1();
    	$(".bannerSlier,.floorSlider").slider_2();
	});

	/*require('./slider_1.js');
	require('./slider_2.js');*/


	//方法二
	/*seajs.use(['../static/src/js/lazyload.js','../static/src/js/public.js','../static/src/js/index.js'],function(){

	});
	
	seajs.use(['jquery','../static/src/js/slider_1.js','../static/src/js/slider_2.js'],function($){
	    $(".mainBanner").slider_1();
	    $(".bannerSlier,.floorSlider").slider_2();
	    
	});*/

	
	


});