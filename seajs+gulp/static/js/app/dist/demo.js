define("../js/app/dist/demo",["fastclick","zepto","helper","cookie","../../../html/error.tpl"],function(e,t,n){e("fastclick")(document.body);var o=e("zepto");e("helper");e("cookie");var r=e("../../../html/error.tpl"),i=template.compile(r)({msg:"加载失败"});o(".match-detail-page").html(i),o("body").click(function(){e.async("toast",function(e){e("toast提示")})})}),define("../js/common/api",["zepto"],function(e,t,n){var o=e("zepto"),r={};r.json=function(e){return e.body?e.body=JSON.stringify(e.body):e.body="{}",void 0==e.async&&(e.async=!0),void 0==e.cache&&(e.cache=!0),o.Deferred(function(t){var n=JSON.parse(e.body);n.rand=(new Date).getTime();var r=o.ajax({url:e.url,type:e.type||"GET",data:n,timeout:e.timeout||5e3,dataType:"json",async:e.async,cache:e.cache,success:function(e,n,o){e||(e={}),1==e.code?t.resolve(e.data,e):t.reject(e)},error:function(){t.reject({msg:"加载失败，请稍后重试"})}});t.xhr=r})},r.jsonp=function(e){return e.body?e.body=JSON.stringify(e.body):e.body="{}",void 0==e.async&&(e.async=!0),o.Deferred(function(t){var n=JSON.parse(e.body);n.rand=(new Date).getTime(),o.ajax({async:e.async,url:e.url,type:"GET",data:n,dataType:"jsonp",jsonp:"callback",timeout:e.timeout||5e3,success:function(e){t.resolve(e)},error:function(e){t.reject(e)}})})},n.exports=r}),define("../js/common/cookie",[],function(e,t,n){var o={};o.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf(e+"=");if(-1!=t){t=t+e.length+1;var n=document.cookie.indexOf(";",t);return-1==n&&(n=document.cookie.length),decodeURI(document.cookie.substring(t,n))}}return""},o.setCookie=function(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+encodeURI(t)+(null==n?"":";expires="+o.toUTCString())},o.checkCookie=function(){var e=o.getCookie("username");null!=e&&""!=e?alert("Welcome again "+e+"!"):null!=(e=prompt("Please enter your name:",""))&&""!=e&&o.setCookie("username",e,365)},o.deleteCookie=function(e){o.setCookie(e,"",-1)},n.exports=o}),define("../js/common/dialog",["zepto"],function(e,t,n){var o=e("zepto");return function(e){var t={title:"提示",type:"success",sureText:"确定",cancelText:"取消",callback:null},n=o.extend(t,e);if(o(".dialog-box").length)return!1;var r='<div class="pop-mask"></div><div class="dialog-box"><p class="title">'+n.title+'</p><div class="dialog-btn"><ul><li class="cancel-btn">'+n.cancelText+'</li><li class="sure-btn">'+n.sureText+"</li></ul></div></div>";o(".pop-mask, .dialog-box").remove(),o("body").append(r),$dialog=o(".dialog-box").show(),$mask=o(".pop-mask").show(),"confirm"==n.type?$dialog.find(".cancel-btn").css({display:"inline-block"}):($dialog.find(".cancel-btn").css({display:"none"}),$dialog.find(".sure-btn").addClass("only-sure-btn"));var i=function(){$dialog.remove(),$mask.remove()};o(".dialog-box .sure-btn").bind("click",function(){i(),n.callback&&"function"==typeof n.callback&&(n.callback(),"confirm"==n.type&&(n.callback=null))}),o(".dialog-box .cancel-btn").bind("click",function(){i(),n.callback=null})}}),define("../js/common/getLocation",["zepto"],function(e,t,n){var o=e("zepto");return function(){return o.Deferred(function(e){if(navigator&&navigator.geolocation){setTimeout(function(){e.reject()},2e4);try{navigator.geolocation.getCurrentPosition(function(t){var n=(t||{}).coords;e.resolve(n)},function(t){e.reject(t)},{enableHighAcuracy:!0,timeout:5e3,maximumAge:3e3})}catch(t){e.reject(t)}}else e.reject()})}}),define("../js/common/getMore",[],function(e,t,n){return function(e,t){function n(){var n=document.querySelectorAll(t),o=n.length;if(o<4)return!1;var r=n[o-2];if(r){var i=r.getBoundingClientRect(),a=window.screen.height||568,c=i.top;i.width>0&&c<a+100&&e&&e()}}clearInterval(o);var o=window.setInterval(function(){n()},200)}}),define("../js/common/goTop",[],function(e,t,n){return function(){clearInterval(t);var e=document.querySelector(".go-top");e||(e=document.createElement("div"),e.className="go-top",document.body.appendChild(e));var t=setInterval(function(){var t=document.documentElement.scrollTop||document.body.scrollTop;e.style.display=t>400?"block":"none"},500);e.onclick=function(){e.style.display="none",document.documentElement.scrollTop=document.body.scrollTop=0}}}),define("../js/common/helper",["template"],function(e,t,n){var o=e("template");return o.helper("$getWinHeight",function(){return window.innerHeight}),o.helper("$halfWinWidth",function(){return.5*window.innerWidth}),o}),define("../js/common/loadjs",["zepto"],function(e,t,n){var o=e("zepto");return function e(t,n){if(e[t]){if(e[t].done)return o.Deferred(function(e){e.resolve()});if(e[t].loading)return e[t].Deferred}return(e[t]={loading:!0,Deferred:o.Deferred(function(o){var r=document.createElement("script");if(r.src=t,n&&_.isObject(n))for(var i in n)r.setAttribute(i,n[i]);r.onload=function(){e[t].done=!0,e[t].loading=!1,e[t].Deferred=null,o.resolve()},r.onerror=function(){e[t]=null,o.reject()},document.getElementsByTagName("head")[0].appendChild(r)})}).Deferred}}),define("../js/common/share",["utility","jdShare"],function(e,t,n){var o={},r=e("utility");o.shareFromApp=function(t){t||(t={}),r.isJDApp()&&e("jdShare").setShareInfo({title:t.title||"京东家",content:t.content||"装修难不倒，家具如何挑，厨具用品哪些好，京东家问答能够解决你的这些问题。",url:"https://ihome.m.jd.com/jdj-m/ihome.html#"+(t.url||"index"),img:t.img||"https://misc.360buyimg.com/business/jdj-m/images/share.jpg",channel:"",callback:null,clickcallback:null,qrparam:null,timeline_title:""})},o.weixinShare=function(e){},n.exports=o}),define("../js/common/toast",[],function(e,t,n){return function(e,t){var n=document.querySelector(".toast-box");if(n||!e)return!1;var t=t||2e3,o=document.createElement("div");o.className="toast-box";var r=document.createElement("p");r.className="toast-msg",r.innerHTML=e,o.appendChild(r),document.body.appendChild(o),setTimeout(function(){var e=document.querySelector(".toast-box");document.body.removeChild(e)},t)}}),define("../js/common/utility",[],function(e,t,n){function o(e){return(e=i.parseInt_10(e))<10&&(e="0"+e),e}function r(){for(var e=["","-webkit-","-ms-","-moz-","-o-"],t="",n=0;n<e.length;n++)t+="position:"+e[n]+"sticky;";var o=document.createElement("div"),r=document.body;o.style.cssText="display:none;"+t,r.appendChild(o);var i=/sticky/i.test(window.getComputedStyle(o).position);return r.removeChild(o),o=null,i}var i={};i.currentUrl=location.protocol+"//"+location.host+location.pathname,i.isMobile=function(e){return/^0?1(3|4|5|7|8)\d{9}$/.test((e||"").toString().trim())},i.getUserAgent=function(){return(navigator.userAgent||"").toLowerCase()},i.parseInt_10=function(e){return parseInt(e,10)},i.parseFloat_10=function(e){return parseFloat(e,10)},i.JSONparse=function(e){if("string"!=typeof e)return"";try{return JSON.parse(e)}catch(e){return""}},i.getTime=function(){return(new Date).getTime()},i.random=function(e,t){return e+Math.floor(t*Math.random())},i.parseQueryString=function(){for(var e={},t=location.search.substring(1).split("&"),n=t.length,o=0;o<n;o++){var r=t[o].split("=");e[r[0]]=r[1]}return e},i.checkRegEmoji=function(e){return/^[^\uD800-\uDBFF]+$/.test((e||"").toString().trim())},i.houMinSec=function(e){var t=parseInt(e/3600),n=parseInt(e%60),r=parseInt((e-60*t*60)/60);return{hh:o(t),mm:o(r),ss:o(n)}},i.createCode=function(){for(var e="",t=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],n=0;n<6;n++)e+=t[Math.floor(36*Math.random())];return e};var a=!1;try{sessionStorage.setItem("1","1"),a=!0}catch(e){}var c={data:{},getItem:function(e){return a?i.JSONparse(sessionStorage.getItem(e)):c.data[e]},setItem:function(e,t){a?sessionStorage.setItem(e,JSON.stringify(t)):c.data[e]=t},removeItem:function(e){a?sessionStorage.removeItem(e):delete c.data[e]}};i.sessionstate=c,i.isJDApp=function(){return"jdapp"==i.getUserAgent().split(";")[0].toLowerCase()},i.isJDios=function(){var e=i.getUserAgent().split(";"),t="";return i.isJDApp()&&(t="iphone"==e[1].toLowerCase()),t},i.isJDandroid=function(){var e=i.getUserAgent().split(";"),t="";return i.isJDApp()&&(t="android"==e[1].toLowerCase()),t},i.stickyDom=function(e){var t;if(!e)return!1;var n=e.normalDom.get(0),o=e.fixedDom.get(0),i=e.fixedTop||0;if(!e.normalDom||!e.fixedDom||0==n.length||0==o.length)return!1;r()?n.className=n.className+" sticky":(clearInterval(t),t=setInterval(function(){n.getBoundingClientRect().top<=i?(o.style.display="block",n.style.opacity=0):(o.style.display="none",n.style.opacity=1)},100))},n.exports=i}),define("../js/tpl/page",[],function(e,t,n){return'<p class="more-title"><span>更多搭配</span><img src="../images/moreMatch.png"></p><ul><% for (var i = 0; i < data.length; i ++) { %>    <li>        <a href="demo.html?articleId=<%= data[i].hardcoverId %> ">          <img src="<%= data[i].titlePicUrl %>">          <span class="tag-type"><%= data[i].recommendType %> </span>          <div class="match-des">              <p class="article-title"><%= data[i].title %></p>              <p class="house-type">                  <span class="border-r"><% if (data[i].room) { %> <em><%= data[i].room %> 室</em><% } %> <% if (data[i].hall) { %> <em><%= data[i].hall %> 厅</em><% } %> <% if (data[i].bathroom) { %> <em><%= data[i].bathroom %> 卫</em><% } %> </span>                  <% if (data[i].houseArea) { %> <span><%= data[i].houseArea %> m²</span><% } %>               </p>              <% if (data[i].roomNum) { %> <em class="room-number"><%= data[i].roomNum %> 个空间</em><% } %>           </div>        </a>    </li><% } %> </ul>'});