// JavaScript Document
/* 
* Prototype 添加方法
* Copyright (c) 2013 某年某月  
* Date: 2013-05-30
* 
*/


/* 删除字符串首尾空格 */
String.prototype.trim=function(){
	var pattern = /^(\s*)|(\s*)$/g;
	return this.replace(pattern,"");
	}
	
	
	
/* 删除数组中的重复项 */
Array.prototype.unique=function(){
	
	    var newArry = new Array();
	    var obj = new Object();
	    for(var i=0; i<this.length; i++)
	    {
		   var temp = this[i];
		   if(!obj[temp])
		   {
			  obj[temp]=1;
			  newArry.push(temp);
			}
		}
		return newArry
	
	}
