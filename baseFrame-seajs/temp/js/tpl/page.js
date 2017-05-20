define("../js/tpl/page", [], function(require, exports, module) {
    var source = '<div class="bigImg">' + '<ul class="bigUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li style="background:<%= list[i].color %>;">' + '<div class="ban_cter">' + '<div class="imgBox">' + '<a  class="focusArea" target="_blank" href="javascript:;">' + '<img class="imgAnimate" src="<%= list[i].url %>" width="820" height="470" />' + '<img class="imgText" src="<%= list[i].text %>"/>' + "</a>" + "</div>" + '<div class="mav">' + '<a style="background:url(../images/smallImg.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"><i></i></a>' + '<span class="mask1"></span>' + '<a style="background:url(../images/smallImg2.png) no-repeat;" href="javascript:;" target="_blank" class="smallImg"></a>' + '<span class="mask2" ></span>' + "</div>" + "</div>" + "</li>" + "<% } %>" + "</ul>" + "</div>" + '<div class="smallBtn">' + '<ul class="smallUl">' + "<% for (var i = 0; i < list.length; i ++) { %>" + '<li class="<% if (i==0) { %>on<% } %>"> <%= i+1 %></li>' + "<% } %>" + "</ul>" + "</div>";
    /*var source = '<ul>'
	+    '<% for (var i = 0; i < list.length; i ++) { %>'
	+        '<li>索引 <%= i + 1 %> ：<%= list[i] %></li>'
	+    '<% } %>'
	+ '</ul>';*/
    return source;
});