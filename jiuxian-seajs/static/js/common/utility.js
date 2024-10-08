// JavaScript Document
define(function(require,exports,module){
    var utility = {};
    /*常用函数*/
    utility.currentUrl = location.protocol + '//' + location.host + location.pathname;
    //校验手机号码
    utility.isMobile = function (str) {
        return /^0?1(3|4|5|7|8)\d{9}$/.test((str||'').toString().trim());
    };

    /*获取浏览器信息*/
    utility.getUserAgent = function () {
        var ua = navigator.userAgent||'';
        return ua.toLowerCase();
    };

    utility.parseInt_10 = function (a){
        return parseInt(a,10);
    };

    utility.parseFloat_10 = function (a){
        return parseFloat(a,10);
    };

    // 当有不合法的json字符串传入时，返回空
    utility.JSONparse = function (str){
        if(typeof str !== 'string'){
            return '';
        }
        try{
            return JSON.parse(str);
        } catch(e){
            return '';
        }
    };

    utility.getTime = function (){
        return (new Date()).getTime();
    };

    // 包含from,不包含to
    utility.random = function (from,to){
        return from + Math.floor(to * Math.random())
    };

    //将url上的参数转为一个对象
    utility.parseQueryString = function(url) {
        var reslut = {};
        var str = url.substring(url.indexOf("?")+1);
        var temp = str.split("&");
        var length = temp.length;
        for(var i = 0; i<length; i++) {
            var key = temp[i].split("=");
            reslut[key[0]]=key[1];
        }
        return reslut;
    };
    

    /**
     * [regEmoji 非表情符号验证正则表达式 表情符号为4字节字符，长度为2，从D800-DBFF开头的]
     * @type {RegExp}
     * (这些特殊字符为表情符号)返回 false
     * 其它文字都返回 true
     */
    utility.checkRegEmoji = function(str){
        return /^[^\uD800-\uDBFF]+$/.test((str||'').toString().trim())
    }; 

    //获取cookie
    utility.getCookie = function (name) {
        if (document.cookie.length > 0) {
            var  start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1){
                   end = document.cookie.length; 
                } 
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };

    //设置cookie
    utility.setCookie = function (name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    };

    //删除cookie
    utility.deleteCookie = function (name, value, expiredays) {
        
    };

    

    //时间戳转为时分秒
    utility.houMinSec = function (time){
        var hh = parseInt(time/(60*60));
        var ss = parseInt(time%(60));        
        var mm = parseInt((time-hh*60*60)/60);
        var result= {
            hh : checkTime(hh),
            mm : checkTime(mm),
            ss : checkTime(ss)
        };
        return result;
    };

    function checkTime(i){
        var i = utility.parseInt_10(i);
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    /*32位随机码*/
    utility.createCode = function (){
        var code = "";
        var codeLength = 6;//验证码的长度
        var checkCode = document.getElementById("checkCode");
        var selectChar = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];//所有候选组成验证码的字符，当然也可以用中文的

        for(var i=0;i<codeLength;i++){
            var charIndex = Math.floor(Math.random()*36);
            code +=selectChar[charIndex];
        }
        return code;
    };


    
    /**
     * 替换sessionStorage
     * 替换目的： 防止iPhone Safari无痕模式使用本地存储时报错；统一进行JSON.stringify()序列化，减少使用时的代码输入
     */
    var sessionStorageEnabled = false;
    try{
        sessionStorage.setItem('1','1');
        sessionStorageEnabled = true;
    } catch(e){

    };

    var sessionstore = {
        data:{},
        getItem:function(key){
            if(sessionStorageEnabled){
                return utility.JSONparse(sessionStorage.getItem(key));
            } else {
                return sessionstore.data[key];
            }
        },
        setItem:function(key,value){
            if(sessionStorageEnabled){
                sessionStorage.setItem(key,JSON.stringify(value));
            } else {
                sessionstore.data[key] = value;
            }
        },
        removeItem:function(key){
            if(sessionStorageEnabled){
                sessionStorage.removeItem(key);
            } else {
                delete sessionstore.data[key];
            }
        }
    };

    utility.sessionstate = sessionstore;


    //判断是否是JDAPP
    utility.isJDApp = function () {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = agentData[0].toLowerCase() == "jdapp";
        return result;
    };

    //判断是否是ios的JDAPP
    utility.isJDios = function () {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = ''
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "iphone";
        }
        return result;
    };

    //判断是否是android的JDAPP
    utility.isJDandroid = function () {
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = ''
        if (utility.isJDApp()) {
            result = agentData[1].toLowerCase() == "android";
        }
        return result;
    };

    // 判断浏览器是否支持sticky属性
    function isSupportSticky() {
        var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
        var stickyText = '';
        for (var i = 0; i < prefixTestList.length; i++ ) {
            stickyText += 'position:' + prefixTestList[i] + 'sticky;';
        }
        // 创建一个dom来检查
        var div = document.createElement('div');
        var body = document.body;
        div.style.cssText = 'display:none;' + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    };

    //调用sticky方法
    utility.stickyDom = function (obj){
        var scrollInter; /*滚动的循环变量*/
        if(!obj){
            return;
        }
        var normal = obj.normal ,
            fixedNav = obj.fixedNav,
            fixedTop = obj.fixedTop || 0,
            $el = obj.view,
            from = obj.from;

        if(!obj.normal || !obj.fixedNav || normal.length==0 || fixedNav.length==0){
            return;
        }
        if(isSupportSticky()){
            normal.addClass('sticky');
        }else/* if(isIOS)*/{
            clearInterval(scrollInter);
            scrollInter = setInterval(function () {
                if($el){
                    if($('body').has($el).length==0){
                        clearInterval(scrollInter);
                        return;
                    }
                    if($el.height()==0){
                        if(from== 'stroeHomeShare'){
                            clearInterval(scrollInter);
                        }
                        return;
                    }
                }
                var rect = normal.get(0).getBoundingClientRect();
                var top = rect.top;
                if(top<=fixedTop){
                    fixedNav.show();
                    normal.css('opacity',0);
                } else {
                    fixedNav.hide();
                    normal.css('opacity',1);
                }
            },10)
        }
    };



    

    

    


// Style properties  //#here : vendor + 参数(将第1个字符转换为大写)
/*    transform = prefixStyle('transform'),  // webkitTransform
    transition = prefixStyle('transition'),  // webkitTransform

// Browser capabilities
    navigator_appVersion = navigator.appVersion,
    isAndroid = (/android/gi).test(navigator_appVersion),
    isIOS = (/iPhone|iPad/gi).test(navigator_appVersion),
    isIOS8 = isIOS && (/OS 8/i).test(navigator_appVersion),
    isIOS9 = isIOS && (/OS 9/i).test(navigator_appVersion),
    isMobileQQ = (/QQ\/([\d.]+)/gi).test(navigator_appVersion),
    isUCBrowser = (/UCBrowser/gi).test(navigator_appVersion),
    isMeiZu = isAndroid && (/\bM(\d)+\s*Build/gi).test(navigator_appVersion),


    isWin = (/Windows/gi).test(navigator_appVersion),
    isMAC = (/Mac/gi).test(navigator_appVersion),
    isLinux = (/Linux/gi).test(navigator_appVersion),
    isWindowsPhone = /(?:Windows Phone)/.test(navigator_appVersion),
    isSymbian = /(?:SymbianOS)/.test(navigator_appVersion) || isWindowsPhone,
    isFireFox = /(?:Firefox)/.test(navigator_appVersion),
    isTablet = /(?:iPad|PlayBook)/.test(navigator_appVersion)||(isFireFox && /(?:Tablet)/.test(navigator_appVersion)),
    isPc = !isIOS && !isAndroid && !isSymbian,


// 微信
    isWeixin = (/MicroMessenger/gi).test(navigator_appVersion),
    isWeixinService = isWeixin;*/

    module.exports = utility;

});












