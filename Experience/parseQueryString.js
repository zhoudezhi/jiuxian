// JavaScript Document
/* 
* parseQueryString   将URL参数解析为一个对象,并返回这个对象
* Copyright (c) 2013 某年某月  
* Date: 2013-05-26
* 
*/

function parseQueryString(url){
	var obj = new Object();
	var key_value = new Array();
	var str = url.substring(url.indexOf("?")+1);
	key_value = str.split("&");
	for(var i=0; i<key_value.length; i++)
	{
		var key=key_value[i].split("=");
		obj[key[0]]=key[1];
		
		}
				
	return obj;
	
	}