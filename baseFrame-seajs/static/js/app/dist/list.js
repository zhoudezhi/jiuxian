/*static-0.1.0  2017-06-21 10:49:25*/

define("../js/app/dist/list",["fastclick","zepto","template","api","toast","helper","goTop","getMore","utility","share"],function(a,b,c){function d(){console.log(1),u&&!v&&(t++,g())}function e(){console.log(2),hasNextPage2&&!isLoading2&&(pageNumber2++,h())}function f(){console.log(3),hasNextPage3&&!isLoading3&&(pageNumber3++,i())}function g(){function a(a){return 1==t&&k(),1==t&&a.length<w&&l(".question-list-new .load-more-status").hide(),1==t&&0==a.length?(l(".question-list-new").html(m.render("qa-list-empty-tpl",{})),v=!1,!1):0==a.length?(u=!1,l(".question-list-new .load-more-status").removeClass("show-status").text("已经到底啦"),!1):(l(".question-list-new ul").append(m.render("question-item-tpl",{result:a})),void(v=!1))}if(v||!u)return!1;v=!0,j({type:1,page:t,pageSize:w},a)}function h(){function a(a){return 1==pageNumber2&&a.length<w&&l(".question-list-hot .load-more-status").hide(),1==pageNumber2&&0==a.length?(l(".question-list-hot").html(m.render("qa-list-empty-tpl",{})),isLoading2=!1,!1):0==a.length?(hasNextPage2=!1,l(".question-list-hot .load-more-status").removeClass("show-status").text("已经到底啦"),!1):(l(".question-list-hot ul").append(m.render("question-item-tpl",{result:a})),void(isLoading2=!1))}if(isLoading2||!hasNextPage2)return!1;isLoading2=!0,j({type:2,page:pageNumber2,pageSize:w},a)}function i(){function a(a){return 1==pageNumber3&&a.length<w&&l(".question-list-useful .load-more-status").hide(),1==pageNumber3&&0==a.length?(l(".question-list-useful").html(m.render("qa-list-empty-tpl",{})),isLoading3=!1,!1):0==a.length?(hasNextPage3=!1,l(".question-list-useful .load-more-status").removeClass("show-status").text("已经到底啦"),!1):(l(".question-list-useful ul").append(m.render("question-item-tpl",{result:a})),void(isLoading3=!1))}if(isLoading3||!hasNextPage3)return!1;isLoading3=!0,j({type:3,page:pageNumber3,pageSize:w},a)}function j(a,b){var a={url:x+"/qaList/qaList",body:{type:a.type,page:a.page,size:a.pageSize}};n.json(a).done(function(a){a||(a=[]),b(a)}).fail(function(a){a||(a={}),o(a.msg)})}function k(){var a={url:x+"/qaList/activeResponsers"};n.json(a).done(function(a){a||(a=[]),l(".question-list-new li").eq(4).after(m.render("invite-question-tpl",{result:a}))}).fail(function(a){})}a("fastclick")(document.body);var l=a("zepto"),m=a("template"),n=a("api"),o=a("toast");a("helper");var p=a("goTop"),q=a("getMore"),r=a("utility"),s=a("share"),t=pageNumber2=pageNumber3=1,u=hasNextPage2=hasNextPage3=!0,v=isLoading2=isLoading3=!1,w=10,x="//ihome.m.jd.com";l(".list-page").html(m.render("loading-page-tpl",{loading:!0})),p(),s.shareFromApp({title:"京东家-问答",content:"每个人在装修前都很迷茫，这里，能够解决你的困惑。",url:"questionList",img:"https://misc.360buyimg.com/business/jdj-m/images/share2.jpg"}),l("body").delegate(".question-type-box li","click",function(a){$target=l(a.currentTarget);var b=$target.index();l(".question-list-type li").eq(b).addClass("on").siblings().removeClass("on"),l(".question-list-type-fixed li").eq(b).addClass("on").siblings().removeClass("on"),l(".question-list>div").eq(b).show().siblings().hide();var c=l(".question-banner").height();1==b&&0==l(".question-list-hot li").length?(h(),l(window).scrollTop(c)):2==b&&0==l(".question-list-useful li").length&&(i(),l(window).scrollTop(c))}),function(){var a={url:x+"/qaList/newestQuestion"};n.json(a).done(function(a){a||(a={});var b=m.render("question-list-tpl",{result:a});l(".list-page").html(b),g(),r.stickyDom({normalDom:l(".question-list-type"),fixedDom:l(".question-list-type-fixed")})}).fail(function(a){a||(a={}),o(a.msg)})}(),q(d,".question-list-new li"),q(e,".question-list-hot li"),q(f,".question-list-useful li")}),define("../js/tpl/page",[],function(a,b,c){return'<p class="more-title"><span>更多搭配</span><img src="../images/moreMatch.png"></p><ul><% for (var i = 0; i < data.length; i ++) { %>    <li>        <a href="demo.html?articleId=<%= data[i].hardcoverId %> ">          <img src="<%= data[i].titlePicUrl %>">          <span class="tag-type"><%= data[i].recommendType %> </span>          <div class="match-des">              <p class="article-title"><%= data[i].title %></p>              <p class="house-type">                  <span class="border-r"><% if (data[i].room) { %> <em><%= data[i].room %> 室</em><% } %> <% if (data[i].hall) { %> <em><%= data[i].hall %> 厅</em><% } %> <% if (data[i].bathroom) { %> <em><%= data[i].bathroom %> 卫</em><% } %> </span>                  <% if (data[i].houseArea) { %> <span><%= data[i].houseArea %> m²</span><% } %>               </p>              <% if (data[i].roomNum) { %> <em class="room-number"><%= data[i].roomNum %> 个空间</em><% } %>           </div>        </a>    </li><% } %> </ul>'}),define("../js/common/api",["zepto"],function(a,b,c){var d=a("zepto"),e={};e.json=function(a){return a.body?a.body=JSON.stringify(a.body):a.body="{}",void 0==a.async&&(a.async=!0),void 0==a.cache&&(a.cache=!0),d.Deferred(function(b){var c=JSON.parse(a.body);c.rand=(new Date).getTime();var e=d.ajax({url:a.url,type:a.type||"GET",data:c,timeout:a.timeout||5e3,dataType:"json",async:a.async,cache:a.cache,success:function(a,c,d){a||(a={}),1==a.code?b.resolve(a.data,a):b.reject(a)},error:function(a){b.reject({type:"network",msg:"加载失败，请稍后重试"})}});b.xhr=e})},e.jsonp=function(a){return a.body?a.body=JSON.stringify(a.body):a.body="{}",void 0==a.async&&(a.async=!0),d.Deferred(function(b){var c=JSON.parse(a.body);c.rand=(new Date).getTime(),d.ajax({async:a.async,url:a.url,type:"GET",data:c,dataType:"jsonp",jsonp:"callback",timeout:a.timeout||5e3,success:function(a){b.resolve(a)},error:function(a){b.reject(a)}})})},c.exports=e}),define("../js/common/cookie",[],function(a,b,c){var d={};d.getCookie=function(a){if(document.cookie.length>0){var b=document.cookie.indexOf(a+"=");if(-1!=b){b=b+a.length+1;var c=document.cookie.indexOf(";",b);return-1==c&&(c=document.cookie.length),unescape(document.cookie.substring(b,c))}}return""},d.setCookie=function(a,b,c){var d=new Date;d.setDate(d.getDate()+c),document.cookie=a+"="+escape(b)+(null==c?"":";expires="+d.toGMTString())},d.checkCookie=function(){var a=d.getCookie("username");null!=a&&""!=a?alert("Welcome again "+a+"!"):null!=(a=prompt("Please enter your name:",""))&&""!=a&&d.setCookie("username",a,365)},c.exports=d}),define("../js/common/dialog",["zepto"],function(a,b,c){var d=a("zepto");return function(a){var b={title:"提示",type:"success",sureText:"确定",cancelText:"取消",callback:null},c=d.extend(b,a);if(d(".dialog-box").length)return!1;var e='<div class="pop-mask"></div><div class="dialog-box"><p class="title">'+c.title+'</p><div class="dialog-btn"><ul><li class="cancel-btn">'+c.cancelText+'</li><li class="sure-btn">'+c.sureText+"</li></ul></div></div>";d(".pop-mask, .dialog-box").remove(),d("body").append(e),$dialog=d(".dialog-box").show(),$mask=d(".pop-mask").show(),"confirm"==c.type?$dialog.find(".cancel-btn").css({display:"inline-block"}):($dialog.find(".cancel-btn").css({display:"none"}),$dialog.find(".sure-btn").addClass("only-sure-btn"));var f=function(){$dialog.remove(),$mask.remove()};d(".dialog-box .sure-btn").bind("click",function(){f(),c.callback&&"function"==typeof c.callback&&(c.callback(),"confirm"==c.type&&(c.callback=null))}),d(".dialog-box .cancel-btn").bind("click",function(){f(),c.callback=null})}}),define("../js/common/getLocation",["zepto"],function(a,b,c){var d=a("zepto");return function(){return d.Deferred(function(a){if(navigator&&navigator.geolocation){setTimeout(function(){a.reject()},2e4);try{navigator.geolocation.getCurrentPosition(function(b){var c=(b||{}).coords;a.resolve(c)},function(b){a.reject(b)},{enableHighAcuracy:!0,timeout:5e3,maximumAge:3e3})}catch(b){a.reject(b)}}else a.reject()})}}),define("../js/common/getMore",[],function(a,b,c){return function(a,b){function c(){var c=document.querySelectorAll(b),d=c.length;if(d<4)return!1;var e=c[d-2];if(e){var f=e.getBoundingClientRect(),g=window.screen.height||568,h=f.top;f.width>0&&h<g+100&&a&&a()}}clearInterval(d);var d=window.setInterval(function(){c()},125)}}),define("../js/common/goTop",[],function(a,b,c){return function(){clearInterval(b);var a=document.querySelector(".go-top");a||(a=document.createElement("div"),a.className="go-top",document.body.appendChild(a));var b=setInterval(function(){var b=document.documentElement.scrollTop||document.body.scrollTop;a.style.display=b>400?"block":"none"},500);a.onclick=function(){a.style.display="none",document.documentElement.scrollTop=document.body.scrollTop=0}}}),define("../js/common/helper",["template"],function(a,b,c){var d=a("template");return d.helper("$getWinHeight",function(){return window.innerHeight}),d.helper("$halfWinWidth",function(){return.5*window.innerWidth}),d}),define("../js/common/loadjs",["zepto"],function(a,b,c){var d=a("zepto");return function a(b,c){if(a[b]){if(a[b].done)return d.Deferred(function(a){a.resolve()});if(a[b].loading)return a[b].Deferred}return a[b]={loading:!0,Deferred:d.Deferred(function(d){var e=document.createElement("script");if(e.src=b,c&&_.isObject(c))for(var f in c)e.setAttribute(f,c[f]);e.onload=function(){a[b].done=!0,a[b].loading=!1,a[b].Deferred=null,d.resolve()},e.onerror=function(){a[b]=null,d.reject()},document.getElementsByTagName("head")[0].appendChild(e)})},a[b].Deferred}}),define("../js/common/share",["utility","jdShare"],function(a,b,c){var d={},e=a("utility");d.shareFromApp=function(b){if(b||(b={}),e.isJDApp()){a("jdShare").setShareInfo({title:b.title||"京东家",content:b.content||"装修难不倒，家具如何挑，厨具用品哪些好，京东家问答能够解决你的这些问题。",url:"https://ihome.m.jd.com/jdj-m/ihome.html#"+(b.url||"index"),img:b.img||"https://misc.360buyimg.com/business/jdj-m/images/share.jpg",channel:"",callback:null,clickcallback:null,qrparam:null,timeline_title:""})}},d.weixinShare=function(a){},c.exports=d}),define("../js/common/toast",[],function(a,b,c){return function(a,b){var c=document.querySelector(".toast-msg");if(c||!a)return!1;var b=b||2e3,d=document.createElement("div");d.className="toast-msg",d.innerHTML=a,document.body.appendChild(d),c=document.querySelector(".toast-msg"),c.style.display="block",setTimeout(function(){document.body.removeChild(c)},b)}}),define("../js/common/utility",["zepto"],function(a,b,c){function d(a){var a=f.parseInt_10(a);return a<10&&(a="0"+a),a}function e(){for(var a=["","-webkit-","-ms-","-moz-","-o-"],b="",c=0;c<a.length;c++)b+="position:"+a[c]+"sticky;";var d=document.createElement("div"),e=document.body;d.style.cssText="display:none;"+b,e.appendChild(d);var f=/sticky/i.test(window.getComputedStyle(d).position);return e.removeChild(d),d=null,f}var f=(a("zepto"),{});f.currentUrl=location.protocol+"//"+location.host+location.pathname,f.isMobile=function(a){return/^0?1(3|4|5|7|8)\d{9}$/.test((a||"").toString().trim())},f.getUserAgent=function(){return(navigator.userAgent||"").toLowerCase()},f.parseInt_10=function(a){return parseInt(a,10)},f.parseFloat_10=function(a){return parseFloat(a,10)},f.JSONparse=function(a){if("string"!=typeof a)return"";try{return JSON.parse(a)}catch(a){return""}},f.getTime=function(){return(new Date).getTime()},f.random=function(a,b){return a+Math.floor(b*Math.random())},f.parseQueryString=function(){for(var a={},b=location.search.substring(1),c=b.split("&"),d=c.length,e=0;e<d;e++){var f=c[e].split("=");a[f[0]]=f[1]}return a},f.checkRegEmoji=function(a){return/^[^\uD800-\uDBFF]+$/.test((a||"").toString().trim())},f.getCookie=function(a){if(document.cookie.length>0){var b=document.cookie.indexOf(a+"=");if(-1!=b){b=b+a.length+1;var c=document.cookie.indexOf(";",b);return-1==c&&(c=document.cookie.length),unescape(document.cookie.substring(b,c))}}return""},f.setCookie=function(a,b,c){var d=new Date;d.setDate(d.getDate()+c),document.cookie=a+"="+escape(b)+(null==c?"":";expires="+d.toGMTString())},f.deleteCookie=function(a,b,c){},f.houMinSec=function(a){var b=parseInt(a/3600),c=parseInt(a%60),e=parseInt((a-60*b*60)/60);return{hh:d(b),mm:d(e),ss:d(c)}},f.createCode=function(){for(var a="",b=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],c=0;c<6;c++){a+=b[Math.floor(36*Math.random())]}return a};var g=!1;try{sessionStorage.setItem("1","1"),g=!0}catch(a){}var h={data:{},getItem:function(a){return g?f.JSONparse(sessionStorage.getItem(a)):h.data[a]},setItem:function(a,b){g?sessionStorage.setItem(a,JSON.stringify(b)):h.data[a]=b},removeItem:function(a){g?sessionStorage.removeItem(a):delete h.data[a]}};f.sessionstate=h,f.isJDApp=function(){return"jdapp"==f.getUserAgent().split(";")[0].toLowerCase()},f.isJDios=function(){var a=f.getUserAgent(),b=a.split(";"),c="";return f.isJDApp()&&(c="iphone"==b[1].toLowerCase()),c},f.isJDandroid=function(){var a=f.getUserAgent(),b=a.split(";"),c="";return f.isJDApp()&&(c="android"==b[1].toLowerCase()),c},f.stickyDom=function(a){var b;if(!a)return!1;var c=a.normalDom.get(0),d=a.fixedDom.get(0),f=a.fixedTop||0;if(!a.normalDom||!a.fixedDom||0==c.length||0==d.length)return!1;e()?c.className=c.className+" sticky":(clearInterval(b),b=setInterval(function(){c.getBoundingClientRect().top<=f?(d.style.display="block",c.style.opacity=0):(d.style.display="none",c.style.opacity=1)},100))},c.exports=f});