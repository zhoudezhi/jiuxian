
define(function(require, exports, module) {
	require('../src/public.js');
	var API_AJAX = require('../../common/api');
	var utility = require("../../common/utility");
	var dialog = require("../../common/dialog");
	var getLocation = require("../../common/getLocation");
	getLocation.getLocation().done(function(result){
		dialog.msg(result);
	}).fail(function(error){
		dialog.msg(error.message);
	});
	
    //var a = utility.checkRegEmoji("zhoudezhi")
    //debugger
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
		url:'https://p.3.cn/prices/mgets',
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