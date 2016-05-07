// JavaScript Document
/* 
* 判断浏览器类型
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/
function getOs(){
	var agent=navigator.userAgent.toLowerCase();
	var isIE=(agent.indexOf("msie"))>0?true:false;
	var isFirefox =(agent.indexOf("firefox"))>0?true:false;
	var isChrome =(agent.indexOf("chrome"))>0?true:false;
	var isSafari =(agent.indexOf("safari"))>0?true:false;
	var isOpera =(agent.indexOf("opera"))>0?true:false;
	if(isIE)
	{
		return  "MSIE"
		}
	if(isFirefox)
	{
		return  "Firefox"
		}
	if(isChrome)
	{
		return  "Chrome"
		}
	if(isSafari)
	{
		return  "Safari"
		}
	if(isOpera)
	{
		return  "Opera"
		}
	
	}