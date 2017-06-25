// JavaScript Document
/* 
 * Name：tpl  公共模版文件
 * Date: 2017-05-20
 *
 * 公共模版文件分为两种，一种是.tpl文件，后缀为tpl，另一种为tpl.js，后缀为js
 * tpl文件模版：由于seajs对于文本文件以XHR方式请求，请求tpl文件是跨域请求，为避免跨域所以将tpl公共模版放在HTML目录下，可以使用模版的简洁语法
 * js文件模版：js公共模版放在tpl目录下，作为单独的js文件，需要使用模版的原生语法
 */
define(function (require, exports, module) {


    var source = '<p class="more-title"><span>更多搭配</span><img src="../images/moreMatch.png"></p>'
        + '<ul>'
        + '<% for (var i = 0; i < data.length; i ++) { %>'
        + '    <li>'
        + '        <a href="demo.html?articleId=<%= data[i].hardcoverId %> ">'
        + '          <img src="<%= data[i].titlePicUrl %>">'
        + '          <span class="tag-type"><%= data[i].recommendType %> </span>'
        + '          <div class="match-des">'
        + '              <p class="article-title"><%= data[i].title %></p>'
        + '              <p class="house-type">'
        + '                  <span class="border-r"><% if (data[i].room) { %> <em><%= data[i].room %> 室</em><% } %> <% if (data[i].hall) { %> <em><%= data[i].hall %> 厅</em><% } %> <% if (data[i].bathroom) { %> <em><%= data[i].bathroom %> 卫</em><% } %> </span>'
        + '                  <% if (data[i].houseArea) { %> <span><%= data[i].houseArea %> m²</span><% } %> '
        + '              </p>'
        + '              <% if (data[i].roomNum) { %> <em class="room-number"><%= data[i].roomNum %> 个空间</em><% } %> '
        + '          </div>'
        + '        </a>'
        + '    </li>'
        + '<% } %> '
        + '</ul>';

    return source;
});