
var $window = $(window);

var indexurl = location.protocol + '//' + location.host + location.pathname;

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

/**
 判断是否合法的经纬度
 */
function isValidCoords(coords){
    return coords && parseFloat_10(coords.longitude) && parseFloat_10(coords.latitude);
}

/*
 朝林广场ios定位 {"coord_type":"2","longitude":"116.505674","latitude":"39.793242"}
 朝林广场Safari定位发送 {"longitude":116.49971450626151,"latitude":39.79195208558683,"coord_type":"
 */
// 参数checkLocal表示若本地存在缓存，则使用本地缓存. 若为false，则强制重新设备位置
function getLocation(){
    return $.Deferred(function(d){      

        
        // 太小经常会在第一次进入页面时报告定位失败，手动点击一下又可以获取到定位，
        // 之前未出现过这种情况，猜测可能是初始时时间太短(500毫秒时会出现)
        // 也可能是因为

        // timeout时间值的设定：
        // 在ios设备上，几乎总是在500ms内便可获取到gps，
        // 但在有些android机上，1600ms会导致因过早终止而获取不到，
        // 因此保守的设置为5000ms
        if (navigator && navigator.geolocation) {
			// 20s后，无论用户是否点击了弹出框中的"允许""不允许"，都reject()一次
			// 需要注意的是，弹框显示的过程中，等待的时间也计算在内
			// 详情查看http://jira.jd.com/browse/OO-13493
			setTimeout(function(){
                d.reject();
			},20000);

            try{
                navigator.geolocation.getCurrentPosition(function(position){
                    var coords = (position||{}).coords;
                    if (isValidCoords(coords)) {
                        //getLocation.savedCoords_ = coords;
                        //sessionstore.setItem(key,coords);
                        d.resolve(coords);
                    } else {
                        d.reject();
                    }
                },function(error){
                    //d.resolve(error);
                    d.reject(error);
                    // andriod 获取不到位置
                },{
                    enableHighAcuracy: true,
                    timeout:isIOS?1500:5000,
                    maximumAge: 3000
                });
            } catch(e){
                d.reject();
            }
        } else {
            d.reject();
        }
    });
}

function AlertToLogin(msg,returnLink){
    Alert({
        title:'温馨提示',
        msg:msg||'您还没有登录',
        button:[
            {
                text:'取消'
            },
            {
                text:'去登录',
                callback:function(){
                    var isFenxiang = sessionStorage.getItem("isFenxiang");
                    if(isFenxiang){
                        toLoginPage();
                    }else{
                        toLoginPage(returnLink);
                    }
                }
            }
        ]
    });
}

/**
 * 获取H5页面跳转到passport页面时的链接
 * @param returnLink 从passport页面返回时的地址链接
 * @returns {string} 返回进过处理后的跳转passport的链接
 */

function toLoginPage(returnLink){
    //暂时做清除缓存处理。 bug:OO-11109
    //如果是门店分享，则不清除缓存的地址
   /* var currentAddr = Address.getLocalCurrent();
    if(!currentAddr || currentAddr._type_ != "share"){
        Address.clear();
    }*/
    var longinUrl = passportUrl(returnLink);

    toLocationHref(longinUrl);
}


/*var isNestedInApp = window.location.search.match(/(\?|\&)channel *\= *(APP|JDAPP|JDQB)\b/i);*/

function ltrim(str,char){
    if(!str || !_.isString(str))return str;
    var r = new RegExp("^\\"+char+"*");
    return str.replace(r,'');
}
function fullhash(url){
    url = (url || window.location.hash).toString();
    var lastIndex = url.lastIndexOf('#');
    return (lastIndex===-1) ? '' : url.substring(lastIndex+1);
}
function addHashSection(addSection){
    var hash = fullhash();
    var splitChar = '/';
    if(hash.charAt(hash.length-1)===splitChar){
        splitChar = '';
    }
    location.hash = hash + splitChar + addSection;
}
function getUrlParam(arr){
    if((typeof arr).toString().toLowerCase() ==='string'){
        arr = arr.split('/');
    }
    // 解析URL参数
    var urlParam = {};
    for(var i=0; i<arr.length; i++){
        var itm = arr[i];
        var index = itm.indexOf(':');
        if(index!==-1){
            var key = itm.substr(0,index);
            var value = itm.substr(index+1);
            urlParam[key] = value;
        }
    }
    return urlParam;
}

function getScrollTop($article){
    if(isIOS){
        $article = $article.find('scroller');
    }
    return $article.scrollTop();
}


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
/*
 function getStringTime(){
 return (new Date()).toLocaleTimeString();
 }*/
function manualRadioSwitch($button,className){
    if(!$button || !$button.parent)return;

    className || (className="current");
    $button.parent().find($button.prop('tagName') + '.' + className).removeClass(className);
    $button.addClass(className);
}

function getDateObjectByStr(datetimeStr){
    var m = (datetimeStr||'').match(/^(\d+)[^0-9]+(\d+)[^0-9]+(\d+)\s+(\d+)[^0-9]+(\d+)[^0-9]?(\d+)?$/) || [];
    var year = parseInt_10(m[1]),
        month = parseInt_10(m[2]),
        day = parseInt_10(m[3]),
        hours = parseInt_10(m[4]),
        minutes = parseInt_10(m[5]),
        seconds = parseInt_10(m[6])||0;
    var d = new Date();
    d.setFullYear(year,month-1,day);
    d.setHours(hours, minutes, seconds);
    d.setMilliseconds(0);
    return d;
}

function getStrByDateObject(DateObject){
    var year = DateObject.getFullYear(),
        month = atleastTwoChar(DateObject.getMonth() + 1),
        day = atleastTwoChar(DateObject.getDate()),

        hours = atleastTwoChar(DateObject.getHours()),
        minutes = atleastTwoChar(DateObject.getMinutes()),
        seconds = atleastTwoChar(DateObject.getSeconds());

    return year+'-'+month+'-'+day + ' ' + hours + ':' + minutes + ':' + seconds;
}

// 参数now : 2015-06-15 12:00:03
function getOneHourLater(now){
    var d = getDateObjectByStr(now);
    var time = d.getTime();
    d = new Date(time + 3600000);

    return getStrByDateObject(d);
}

function atleastTwoChar(str){
    str = str.toString();
    return str.length<2 ? '0'+str : str;
}


// 获取<select>元素的value，如果值的索引小于某个指定的位置(像带“请选择”这样的选项，“请选择”这一项被认为没有选)，或完全没选，则返回null
function getSelectedValue(select,options){
    var option = getSelectedOption(select,options);
    return option ? option.value : null;
}
function getSelectedOption(select,options){
    var minSelectedIndex = (options||{}).minSelectedIndex || -2;
    var selectedIndex = select.selectedIndex;
    if(selectedIndex<minSelectedIndex){
        return null;
    }
    return select.options[selectedIndex];
}


// 包含from,不包含to
function random(from,to){
    return from + Math.floor( to * Math.random() )
}
// 价格等格式化
function twoDecimalPlaces(money,options){
    return (Math.round((parseFloat_10(money)||0) * 100)/100).toFixed(2);
}



function toLocationHref(href,delay){
    setTimeout(function(){
        window.location.href = href;
        //alert("logend")
    },delay||0)
}


var tokenWaiter = 120;
function setTimerTime(tokenId){
    tokenWaiter -= 1;
    if (tokenWaiter == 0) {
        clearInterval(User.timer);
        $(tokenId).text("获取验证码").removeClass('lose');
        tokenWaiter = 120;
    } else {
        $(tokenId).text(tokenWaiter + "秒后重发").addClass('lose');
    }
}

function timeToString(timestamp){
    var d = new Date(timestamp),
        minute = d.getMinutes(),
        second = d.getSeconds();
    return (minute>=10 ? minute : '0'+minute) + ':' + (second>=10 ? second : '0'+second);
}

/////
function getFormData(form){
    var data = {};
    var name,value;

    $('input[name],textarea[name],select[name]',form).each(function(){
        var type = this.type;
        if((type!=='checkbox' && type!=='radio') || this.checked){ // ①||② ： ①获取那些不是复选框、单选框的值，②以及那些复选框、单选框中被选中的某个元素的值，未被选中的忽略
            name = this.name;
            value = this.value;
            data[name] = value;
        }
    });
    return data;
}

//build:delete start
function getTpl(ID){//console.log(ID);
    return template.get(ID);
}
//build:delete end
//版本号
//appVersion = "3.0.0";
//platCode = "H5";
//跳转协议；根据不同的入参，跳入相应的页面中过
/*function mapTargetHrefByType(to,params,extraInfo){
    params = params || {};
	extraInfo || (extraInfo={});
    var pageName = window.location.href;
    var marketLoc = pageName.indexOf('marketindex');
    if((marketLoc != -1) && (to == "web")){
        if(params.url){
            if(params.url.indexOf('?')!=-1){
                //toDo:营销首页判断type=2
                if(params.type == "2"){
                    return params.url +'&isMarket=true'+ '&longitude=' + extraInfo.longitude + '&latitude=' + extraInfo.latitude+'&appVersion=' + appVersion + '&platCode' + platCode;
                }
                return params.url+'&isMarket=true';
            }else{
                if(params.type == "2"){
                    return params.url+'?isMarket=true' + '&longitude=' + extraInfo.longitude + '&latitude=' + extraInfo.latitude+'&appVersion=' + appVersion + '&platCode' + platCode;
                }
                return params.url+'?isMarket=true';
            }
        }else{
            return "javascript:void 0;";
        }
    }
	// http://prepdjm.jd.com/activity/couponsCenter/index.html?needPin=yes
	// 备注： 当跳转至领券中心时，如果是跳转到领券中心，则在url上面追加地址信息
	//       敏敏说这是一个临时解决方案，但是我们都知道，这其实是一个最终解决方案。
    //params == 2代表是gshop的活动
    if(to == "web" && params.type == "2"){
        if(params.url.indexOf('?')!=-1){
            params.url = params.url + '&longitude=' + extraInfo.longitude + '&latitude=' + extraInfo.latitude+'&appVersion=' + appVersion + '&platCode' + platCode;
        }
        else{
            params.url = params.url + '?longitude=' + extraInfo.longitude + '&latitude=' + extraInfo.latitude+'&appVersion=' + appVersion + '&platCode' + platCode;
        }

    }
	var map = {
		'web'				: (params.url && params.url.match(/activity\/couponsCenter\/index\.html/i))
								? appendQuery(params.url,
											 'cityId=' + (encodeURIComponent(extraInfo.cityId || extraInfo.cityCode || extraInfo.areaCode || '')) +
											 '&city=' + (encodeURIComponent(extraInfo.city || extraInfo.cityName || '')) +
											 '&lng=' + (extraInfo.longitude || '') +
											 '&lat=' + (extraInfo.latitude || ''))
								: params.url,
		'channelPage'		: '#channelPage/channelId:'+params.channelId,
		'wmdj'				: '#restaurant',
		'storeList'			: '#storeList/storetypeId:' + (params.venderIndustryType || ''),
		'outPlat'			: (params.busyNum==1 &&  '#daojialist') || (params.busyNum==2 &&  '#elemelist'),
		'storeListByKey'	: 'javascript:void 0;',
		'store'				: '#storeHome/storeId:'+params.storeId+ '/orgCode:' + params.orgCode,
		'productDetail'		: '#goodsDetails/skuId:' + params.skuId + '/storeId:' + params.storeId + '/orgCode:' + params.orgCode,
		'activityDetail'	: '#activityPage/actNativeId:' + params.activityId,
		'activityBusy'		: '#activityPage/actNativeId:' + params.activityId + "/storeId:"+ params.storeId +"/activityBusy:true",
        'fightGroup'		: '#pintuanList',
        'home'             :  '#index',
		'msdjStore'			: '#daojiamenu/rid:' + params.restaurantId +
								'/title:' + encodeURIComponent(params.restaurantName) +
								'/cityId:' + params.cityID +
								'/areaId:' + params.areaID +
								'/servingtimes:'+params.amstartTime+','+params.amendTime+','+params.pmstartTime+','+params.pmendTime +
								'/delayTime:' + params.delayTime +
								'/packagingCostPolicy:' + params.packagingCostPolicy +
								'/packagingParameter:' + params.packagingParameter +
								'/freightPrice:' + params.freightPrice +
								'/minConsumption:' + params.deliver_amount
	};
	return map[to] || "javascript:void 0;";
}*/
/*
function orderState(curTrack){
    return  (curTrack == -1 && "已取消") 	||
        (curTrack == -2 && "已锁定") 	||
        "未知";
}*/

function goBack(animation,n){
    Manager.animation = arguments.length>0 ? animation : 'prev';
    n = _.isNumber(n) ? n : -1;
    history.go(n);
}
function goTo(options){
    Manager.goTo(options);
}
function toHomePage(){
    Manager.goTo({hash:'#index',animation:'prev'});
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




//build:delete start
function forE(o) {
    if(typeof o === 'string'){alert('JUST STRING : '+o);return;}
    o||(o={});
    var s = '';
    for (var p in o) {
        s += p + ' : ' + o[p] + '\n';
    }
    alert(s);
}

function forS(o) {
    if(typeof o === 'string'){return ('JUST STRING : '+o);}
    var s = '';
    for (var p in o) {
        s += p + ' : ' + o[p] + '\n\n';
    }
    return s;
}

function js(title,obj){
    if(typeof title == 'object'){
        obj = title;
        title = '';
    }
    if(title){title = title + ' : \n\n';}
    //console.log(title + ' : \n\n' + JSON.stringify(obj));
    return (title + JSON.stringify(obj));

}

var console;
var countxxt = 0;
txt = function(msg){
    var msgdiv = document.getElementById('txt-msg');
    if(!msgdiv){
        msgdiv = document.createElement('div');
        msgdiv.id = 'txt-msg';
        msgdiv.style.cssText = 'position:fixed; z-index:9999; right:0; top:0px; width:160px; height:260px; border:1px solid red; background-color:#fff;';
        document.body.appendChild(msgdiv);
        msgdiv.onclick=function(){msgdiv.innerHTML=''}
    }

    var p = msgdiv.innerHTML;
    msgdiv.innerHTML = (countxxt++) + ':' + msg + '<br>' + p;
};

function _clear(){
    if(document.getElementById('txt-msg')){
        document.getElementById('txt-msg').innerHTML = '';
    } else if(window.console !== undefined && window.console.clear) {
        console.clear();
    }

}
function uploadTouch(){
    $.ajax({
        url:'recordtouch.php',
        type:'POST',
        data:{touches:uploadAAA},
        dataType:"html"
    });
    window.setTimeout(function(){
        uploadAAA=[];
    },1);
}
function uploadHashTime(time){
    $.ajax({
        url:'recordtouch.php',
        type:'POST',
        data:{time:time},
        dataType:"html"
    });
}
var uploadAAA = [];
var timeoutidAAA;
//build:delete end


// JavaScript Document
function prefixStyle (style) {
    if ( vendor === '' ) return style;

    style = style.charAt(0).toUpperCase() + style.substr(1);
    return vendor + style;
}
var dummyStyle = document.createElement('div').style,
    vendor = (function () {
        var vendors = ["t", "webkitT", "MozT", "msT", "OT"], t, i = 0, l = vendors.length;

        for ( ; i < l; i++ ) {
            t = vendors[i] + 'ransform';
            if ( t in dummyStyle ) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    })(),

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


    //判断是否是JDAPP
     isJDApp = function(){
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = agentData[0].toLowerCase() == "jdapp";
        return result;
     }

     //判断是否是ios的JDAPP
     isJDios = function(){
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = ''
        if (isJDApp()) {
            result = agentData[1].toLowerCase() == "iphone";
        }
        return result;
     }

      //判断是否是android的JDAPP
     isJDandroid = function(){
        var ua = getUserAgent();
        var agentData = ua.split(";");
        var result = ''
        if (isJDApp()) {
            result = agentData[1].toLowerCase() == "android";
        }
        return result;
     }


    //判断是否特定版本的主站App    入参为版本号，不传的话默认为5.0.0(500)
    isJdAppVersion = function(data){
        var ua = getUserAgent();
        var version = data || 500;
        var result = ''
        if(isJDApp()) {
            var os_code = ua.split(";")[2].replace(/\./g, '');
            if (os_code>=version) {
                return result;
            }
            return result;
        }
    }


/*
 RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
 ANIMATIONEND_EV = (function () {
 if ( vendor === false ) return false;

 return {
 ''			: 'animationend',
 'webkit'	: 'webkitAnimationEnd',
 'Moz'		: 'animationend',
 'O'			: 'oAnimationEnd',
 'ms'		: 'MSAnimationEnd'
 }[vendor];
 })();*/

//var isNiceMachine = (isAndroid||isIOS9) ? false : true;

var useWindowScrollForPage = true;
/*
 var usePageAnimation = isAndroid ? false : true;
 */
function pureHtml(html){
    html = noScriptHtml(html);
    var div = document.createElement('div');
    div.innerHTML = html;
    $(div).find('*').removeClass();
    return div.innerHTML;
}
function noScriptHtml(html){
    return html.replace(/<script.*?>.*?<\/script>/ig, '');
}
function noHtmlTag(html){
    if(!html){
        return "";
    } else{
        return html.replace(/</ig, '&lt;').replace(/>/ig, '&gt;');
    }
}


function getComputedTranslateX(element) {
    var x,y,style = getComputedStyle(element, null);

    var matrix = style[transform].split(')')[0].split(', '); // 	"matrix(1, 0, 0, 1, -12800, 0)"

    x = +(matrix[12] || matrix[4]);
    x || (x=0);
    return x;
}




function isMobile(str) {
    return /^0?1(3|4|5|7|8)\d{9}$/.test((str||'').toString().trim());
}




/*判断channel ，区别入口*/
/*var isApp = function(){
    var url = window.location.href,
        isApp = /channel\=((app)|(JDapp)|(wyqb)|(fulicheng))/i.test(url.toString().trim());
    isApp && addCookie('isApp',isApp);
    return getCookie('isApp');
};*/
/*判断主站channel ，做登入*/
/*var isJdApp = function(){
    var url = window.location.href,
        isApp = /channel\=((app)|(JDapp))/i.test(url.toString().trim());
    isApp && addCookie('isJdApp',isApp);
    return getCookie('isJdApp');
};
var jsJdAppService = isJdApp() ;*/
/*网银钱包sid*/
/*var hasSid = function(){
    var url = window.location.href,
        auth = /auth\=([0-9a-zA-Z]*)/i.exec(url.toString().trim()),
        sid = auth && auth[1] || false;
    return sid;
};*/
/*京东主站sid*/
/*var isAppSid = function(){
    var url = window.location.href,
        auth = /sid\=([0-9a-zA-Z]*)/i.exec(url.toString().trim()) ,
        sid = auth && auth[1] || false;
    return sid;
};*/
/*网银钱包channel判断*/
/*var isWyqb = function(){
    var url = window.location.href,
        isApp = /channel\=(wyqb)/i.test(url.toString().trim());
    return isApp;
};*/

/*获取url上的参数*/
var getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};


function appendQuery(url, query) {
    if (query == '') return url;
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}



/*代码预防冲突*/
// 已转入buildtemp/externs_variable.js
//jaq=jap=JA=lg=null;






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






//项目初始化时调用，统计入参并加载JS文件
// 每个页面只可引用一次，不可重复引用。请确保jap变量是合法的全局变量：
/*function tongjiNew(){
    window.addEventListener('hashchange',function(e){
        setJapAccount();
    },true);
    var daojiaPIN = getCookie('PDJ_H5_PIN');
    // 王春雨 修改 增加埋点统计 20160203 TODO
    Address.getLocalCurrent();
    window.jap || (window.jap={});
    _.extend(window.jap,{
        anchorpvflag:1,
        siteId : 'UA-J2011-19',
        topic: 'traffic-oom',
        account : daojiaPIN,
        adsCookieName: '',
        jumpAppEnable : 1,
        __cookie_jda: '__tra',
        __cookie_jdb: '__trb',
        __cookie_jdc: '__trc',
        __cookie_jdu: '__tru',
        __cookie_jdv: '__trv',
        extParams: window.jap.extParams || {}
    });
    loadjs(window.location.protocol+'//misc.360buyimg.com/jdf/1.0.0/unit/ja/1.0.0/ja.js');
}*/






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
}
function stickyDom(obj){
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
}
/*获取滚动条的监听对象*/
function getScrollObj(This){
    var $scroll;
    //if(isIOS){
    //    $scroll = $('.scroller',This);
    //}else if(useWindowScrollForPage){
    $scroll = $(window);
    //}else{
    //    $scroll= $('.scrolling',This);
    //}
    return $scroll;
}


/**
 * 用于优惠券列表的弹窗样式 目前只有一处使用 -by ?
 * @param options
 */
function detailCouponAlert(options){
    options || (options={});
    var data = options;
    new (Backbone.View.extend({
        events:{
            'click .alert-button':'closeWin'
        },
        initialize:function(options){
            var html = getTpl('detail-coupon-tpl')(data);
            this.$el.html(html);
            document.body.appendChild(this.el);

            var This = this;
            $window.off('hashchange.Alert').on('hashchange.Alert',function(){
                This.close();
            });
        },
        closeWin:function(e){
            this.close();
        },
        close:function(){
            this.remove();
            $window.off('hashchange.Alert');
        }
    }))();
}
function Swipe($container,options){
    setTimeout(function(){
        $($container).each(function(){
            Swipe7(this,options);
        });
    },1);
}
function passportUrl(returnLink){
    var passport = 'https://plogin.m.jd.com/user/login.action?appid=243&returnurl=';

    //returnLink = JSON.stringify({returnLink:returnLink||window.location.href});
    //var returnurl = encodeURI(window.location.protocol + '//' + window.location.host + '/client?functionId=login/returnPassport&appName=jiankangdaojia&platCode=H5&body=') + encodeURIComponent(returnLink);
    returnLink = window.location.href;
    //returnLink = 'http://mdz.jd.com/user/H5/customized/index.html#style';
   var  returnurl = encodeURIComponent((returnLink));
   //var  returnurl = returnLink;
    return passport+returnurl;
}

function toLoginPage(returnLink){
    toLocationHref(passportUrl(returnLink));
}
/*微信设置标题时bug*/
function weixinTitleBugHack(){
    if(isWeixinService){
        var $iframe = $('<iframe src="x" style="display:none;"></iframe>').on('load', function() {
            setTimeout(function(){$iframe.off('load').remove()},0);
        }).appendTo($(document.body));
    }
}

