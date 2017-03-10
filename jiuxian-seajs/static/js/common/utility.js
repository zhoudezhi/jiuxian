


var sessionStorageEnabled = false;
try{
    sessionStorage.setItem('1','1');
    sessionStorageEnabled = true;
} catch(e){



}

/**
 * [regEmoji 非表情符号验证正则表达式 表情符号为4字节字符，长度为2，从D800-DBFF开头的]
 * @type {RegExp}
 * (这些特殊字符为表情符号)返回 false
 * 其它文字都返回 true
 */
var regEmoji = /^[^\uD800-\uDBFF]+$/; //

/**
 * 替换sessionStorage
 * 替换目的： 防止iPhone Safari无痕模式使用本地存储时报错；统一进行JSON.stringify()序列化，减少使用时的代码输入
 */
var sessionstore = {
    data:{},
    getItem:function(key){
        if(sessionStorageEnabled){
            return JSONparse(sessionStorage.getItem(key));
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

var sessionstate = sessionstore;



var state = {
    _data:{},
    setItem:function(key,data){
        this._data[key] = data;
    },
    getItem:function(key,obj){
        var data = this._data[key];
        return data;
    },
    removeItem:function(key){
        delete this._data[key];
    }
};





function parseInt_10(a){
    return parseInt(a,10);
}
function parseFloat_10(a){
    return parseFloat(a,10);
}
function realPriceToFen(r){
    return parseInt_10(parseFloat_10(r)*100);
}
function fenToRealPrice(r){
    return parseFloat_10(r)/100;
}
function getTime(){
    return (new Date()).getTime();
}
function getDatePart(serverTime){
    if(!serverTime)return '';
    var date = serverTime.split(' ')[0];
    return date;
}








// 包含from,不包含to
function random(from,to){
    return from + Math.floor( to * Math.random() )
}
// 价格等格式化
function twoDecimalPlaces(money,options){
    return (Math.round((parseFloat_10(money)||0) * 100)/100).toFixed(2);
}






function timeToString(timestamp){
    var d = new Date(timestamp),
        minute = d.getMinutes(),
        second = d.getSeconds();
    return (minute>=10 ? minute : '0'+minute) + ':' + (second>=10 ? second : '0'+second);
}





// 确保当json字符串格式不合法时，不报错
// 当有不合法的json字符串传入时，返回null
function JSONparse(str){
    if(typeof str !== 'string')return null;

    try{
        return JSON.parse(str);
    } catch(e){
        return null;
    }
}












// Style properties  //#here : vendor + 参数(将第1个字符转换为大写)
    transform = prefixStyle('transform'),  // webkitTransform
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

/*zy add 20150915*/
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
    isWeixinService = isWeixin;













function isMobile(str) {
    return /^0?1(3|4|5|7|8)\d{9}$/.test((str||'').toString().trim());
}






/*获取url上的参数*/
var getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};












/*32位随机码*/
function createCode(){
    var code = "";
    var codeLength = 6;//验证码的长度
    var checkCode = document.getElementById("checkCode");
    var selectChar = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];//所有候选组成验证码的字符，当然也可以用中文的

    for(var i=0;i<codeLength;i++){
        var charIndex = Math.floor(Math.random()*36);
        code +=selectChar[charIndex];
    }
    return code;
}











function houMinSec(timeLeft){
    var ss = parseInt(timeLeft%(60));
    var hh = parseInt(timeLeft/(60*60));
    var mm = parseInt((timeLeft-hh*60*60)/60);
    var time= {
        hh :checkTime(hh),
        mm : checkTime(mm),
        ss : checkTime(ss)
    };
    return time;
}
function checkTime(i){
    i = parseInt(i);
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/*获取浏览器信息*/
function getUserAgent(){
    var ua = navigator.userAgent||'';
    return ua ;
}









