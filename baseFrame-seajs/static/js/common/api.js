define(function(require,exports,module){
	var API_AJAX = {};
	// 默认为异步GET请求,
	// timeout 超时设置，默认5000ms
	API_AJAX.json = function(data){
		if(data.body){
			data.body = JSON.stringify(data.body);
		}else{
			data.body = '{}';
		}
		if(data.async == undefined){
			data.async = true;
		}
		if(data.cache == undefined){
			data.cache = true;
		}
		return  $.Deferred(function(d){		
			var result= JSON.parse(data.body);
			result.rand = new Date().getTime();
			var xhr = $.ajax({
				url:data.url,
				type:data.type||'GET',
				data:result,
				timeout:data.timeout || 5000,
				dataType:'json',
				async:data.async,
				cache:data.cache,
				success:function(resp,status,xhr){
					resp || (resp={});
					var code = resp.status;
					if(code == 1){
						d.resolve(resp.data,resp);
					} else {						
						d.reject(resp);
					}
				},
				error:function(error){
					d.reject({type:'network',msg:'加载失败，请稍后重试'});
				}
			});
			d.xhr = xhr;
		});
	}


	API_AJAX.jsonp = function(data){
		if(data.body){
			data.body = JSON.stringify(data.body);
		}else{
			data.body = '{}';
		}	
		if(data.async == undefined){
			data.async = true;
		}
		return $.Deferred(function(d){
			var result= JSON.parse(data.body);
			result.rand = new Date().getTime();
	        $.ajax({
	            async:data.async,
	            url:data.url,
	            type:'GET',
	            data:result,
	            dataType:'jsonp',
	            jsonp:'callback',
	            timeout:data.timeout || 5000,
	            success: function (result){
	                d.resolve(result);
	            },
	            error:function(error){
	                d.reject(error);
	            }
	        })
    	})
	}
	module.exports = API_AJAX;
	
});




