/*static-0.1.0  2017-07-01 18:42:18*/

define("../js/app/dist/demo",["fastclick","toast"],function(a){a("fastclick")(document.body),a("toast")("页面初始化")}),define("../js/tpl/page",[],function(a,b,c){return'<p class="more-title"><span>更多搭配</span><img src="../images/moreMatch.png"></p><ul><% for (var i = 0; i < data.length; i ++) { %>    <li>        <a href="demo.html?articleId=<%= data[i].hardcoverId %> ">          <img src="<%= data[i].titlePicUrl %>">          <span class="tag-type"><%= data[i].recommendType %> </span>          <div class="match-des">              <p class="article-title"><%= data[i].title %></p>              <p class="house-type">                  <span class="border-r"><% if (data[i].room) { %> <em><%= data[i].room %> 室</em><% } %> <% if (data[i].hall) { %> <em><%= data[i].hall %> 厅</em><% } %> <% if (data[i].bathroom) { %> <em><%= data[i].bathroom %> 卫</em><% } %> </span>                  <% if (data[i].houseArea) { %> <span><%= data[i].houseArea %> m²</span><% } %>               </p>              <% if (data[i].roomNum) { %> <em class="room-number"><%= data[i].roomNum %> 个空间</em><% } %>           </div>        </a>    </li><% } %> </ul>'}),define("../js/common/toast",[],function(a,b,c){return function(a,b){var c=document.querySelector(".toast-msg");if(c||!a)return!1;var b=b||2e3,d=document.createElement("div");d.className="toast-msg",d.innerHTML=a,document.body.appendChild(d),c=document.querySelector(".toast-msg"),c.style.display="block",setTimeout(function(){document.body.removeChild(c)},b)}});