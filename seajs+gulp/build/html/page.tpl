<!--
 * 公共模版文件分为两种，一种是.tpl文件，后缀为tpl，另一种为tpl.js，后缀为js
 * tpl文件模版：由于seajs对于文本文件以XHR方式请求，请求tpl文件是跨域请求，为避免跨域所以将tpl公共模版放在HTML目录下，可以使用模版的简洁语法
 * js文件模版：js公共模版放在tpl目录下，作为单独的js文件，需要使用模版的原生语法
 -->
{{if data && data.length}}
<p class="more-title"><span>更多搭配</span><img src="../images/moreMatch.png"></p>
<ul>
    {{each data}}
    <li>
        <a href="demo.html?articleId={{$value.hardcoverId}}">
            <img src="{{$value.titlePicUrl}}" onerror="this.src='../images/error.png'">
            <span class="tag-type">{{$value.recommendType}}</span>
            <div class="match-des">
                <p class="article-title">{{$value.title}}</p>
                <p class="house-type">
                    <span class="border-r">{{if $value.room}}<em>{{$value.room}}室</em>{{/if}}{{if $value.hall}}<em>{{$value.hall}}厅</em>{{/if}}{{if $value.bathroom }}<em>{{$value.bathroom}}卫</em>{{/if}}</span>
                    {{if $value.houseArea}}<span>{{$value.houseArea}}m²</span>{{/if}}
                </p>
                {{if $value.roomNum}}<em class="room-number">{{$value.roomNum}}个空间</em>{{/if}}
            </div>
        </a>
    </li>
    {{/each}}
</ul>
{{/if}}