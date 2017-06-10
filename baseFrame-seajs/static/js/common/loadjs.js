// JavaScript Document
/* 
* loadjs  加载js文件
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define(function(require,exports,module){
    var $ = require('zepto');
    // 同一个js只会加载一次，区别方式为src
    // 也就是说同一个src，不同的attributes，只会加载第一次
    return  function loadjs(src,attributes){
                if(loadjs[src]){
                    if(loadjs[src].done){
                        return $.Deferred(function(d){d.resolve()});
                    } else if(loadjs[src].loading){
                        return loadjs[src].Deferred;
                    }
                }
                loadjs[src] = {
                    loading     : true,
                    Deferred    : $.Deferred(function(d){
                        var s = document.createElement('script');
                        s.src = src;
                        if(attributes && _.isObject(attributes)){
                            for(var name in attributes){
                                s.setAttribute(name,attributes[name]);
                            }
                        }

                        s.onload = function(){
                            loadjs[src].done = true;
                            loadjs[src].loading = false;
                            loadjs[src].Deferred = null;
                            d.resolve();
                        };
                        s.onerror = function(){
                            loadjs[src] = null;
                            d.reject();
                        }

                        var p = document.getElementsByTagName('head')[0];
                        p.appendChild(s);
                    })
                }

                return loadjs[src].Deferred;
            }
})


