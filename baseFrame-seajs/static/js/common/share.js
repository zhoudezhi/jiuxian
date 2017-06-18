// JavaScript Document
/* 
* 分享组件，所有渠道的分享，单独将分享作为一个组件
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define(function(require,exports,module){
	var share = {};
    var utility = require('utility');

    //京东app分享
    share.shareFromApp = function (data){
        data || (data = {})
        if(utility.isJDApp()){
        	var jdShare = require('jdShare');
            jdShare.setShareInfo({
                title : data.title || '京东家',
                content : data.content || '装修难不倒，家具如何挑，厨具用品哪些好，京东家问答能够解决你的这些问题。',
                url : "https://ihome.m.jd.com/jdj-m/ihome.html#" + (data.url || "index"),
                img : data.img || 'https://misc.360buyimg.com/business/jdj-m/images/share.jpg',
                channel: '',
                callback: null,  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作,
                clickcallback:null, // 5.2新增 分享面板中点击分享渠道成功后回调 注意 sendDirectShare 不支持这个回调方法
                qrparam:null, // 具体配置详见 5.2新增 二维码分享 
                timeline_title:'' // 5.4新增 朋友圈字段
            });   
        }
    };

    //微信分享
    share.weixinShare = function (data) {

    };

   	module.exports = share;
});


