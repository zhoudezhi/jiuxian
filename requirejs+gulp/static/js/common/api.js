// JavaScript Document
/*
 * Name：api  ajax公共方法，返回deferred延迟对象
 * Date: 2017-05-20
 */
define(["zepto"],function ($) {
    var API_AJAX = {};
    // 默认为异步GET请求,
    // timeout 超时设置，默认5000ms
    API_AJAX.json = function (data) {
        if (data.body) {
            data.body = JSON.stringify(data.body);
        } else {
            data.body = '{}';
        }
        if (data.async == undefined) {
            data.async = true;
        }
        if (data.cache == undefined) {
            data.cache = true;
        }
        return $.Deferred(function (d) {
            var result = JSON.parse(data.body);
            result.rand = new Date().getTime();
            var xhr = $.ajax({
                url: data.url,
                type: data.type || 'GET',
                data: result,
                timeout: data.timeout || 5000,
                dataType: 'json',
                async: data.async,
                cache: data.cache,
                success: function (res, status, xhr) {
                    res || (res = {});
                    if (res.code == 1) {
                        d.resolve(res.data, res);
                    } else {
                        d.reject(res);
                    }
                },
                error: function () {
                    d.reject({ msg: '加载失败，请稍后重试'});
                }
            });
            d.xhr = xhr;
        });
    };


    API_AJAX.jsonp = function (data) {
        if (data.body) {
            data.body = JSON.stringify(data.body);
        } else {
            data.body = '{}';
        }
        if (data.async == undefined) {
            data.async = true;
        }
        return $.Deferred(function (d) {
            var result = JSON.parse(data.body);
            result.rand = new Date().getTime();
            $.ajax({
                async: data.async,
                url: data.url,
                type: 'GET',
                data: result,
                dataType: 'jsonp',
                jsonp: 'callback',
                timeout: data.timeout || 5000,
                success: function (result) {
                    d.resolve(result);
                },
                error: function (error) {
                    d.reject(error);
                }
            })
        })
    };
    return  API_AJAX;
});




