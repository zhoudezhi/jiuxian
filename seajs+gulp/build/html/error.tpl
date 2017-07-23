<!--
 * 公共模版文件分为两种，一种是.tpl文件，后缀为tpl，另一种为tpl.js，后缀为js
 * tpl文件模版：由于seajs对于文本文件以XHR方式请求，请求tpl文件是跨域请求，为避免跨域所以将tpl公共模版放在HTML目录下，可以使用模版的简洁语法
 * js文件模版：js公共模版放在tpl目录下，作为单独的js文件，需要使用模版的原生语法
 -->

<div class="error-page" style="min-height:{{$getWinHeight()}}px">
    <div class="error-box">
        <p class="error-title"> {{ msg || "请检查您的网络连接" }}</p>
        <a class="error-btn" href="javascript:window.location.reload()">重新加载</a>
    </div>
</div>
