// JavaScript Document
/* 
 * Name：tpl  公共模版文件
 * Date: 2017-05-20
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