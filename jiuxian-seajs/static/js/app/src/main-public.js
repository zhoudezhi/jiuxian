
define(function(require, exports, module) {
	require('../src/public.js');
	var API_AJAX = require('../../common/api');

	var data = {
        url:'http://bundlingsale.jd.com/json/bundlingSaleConsignee/getNameById.action',
        body:{
            provinceId:1,
            cityId:72,
            countyId:2839    
        }
    };
	API_AJAX.json_ajax(data).done(function(result){
		console.log(result)
	}).fail(function(error){
		console.log(error)
	});

	var data1 = {
		url:'//p.3.cn/prices/mgets',
        body:{
            skuIds:'J_1679083129',
            type:1
        },
        async:false
	};

	API_AJAX.jsonp_ajax(data1).done(function(result){
		console.log(result)
	}).fail(function(error){
		console.log(error)
	});
});