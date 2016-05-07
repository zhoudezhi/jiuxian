// JavaScript Document
/* 
* 判断一个字符串中出现次数最多的字符，统计次数并输出
* Copyright (c) 2013 某年某月  
* Date: 2013-05-26
* 
*/

function get(str)
{	
	
	var obj={};
	var maxkey,maxvalue=-1,key;
	for(var i=0;i<=str.length;i++)
	{
	 key=str.charAt(i)
		if(!obj[key])
		{
			obj[key]=1;
			}
	    else
		{
			obj[key]++;
			}
	
	    }
		
	for(key in obj)          //遍历对象
	{
		if(obj[key]>maxvalue)
		{
		maxvalue=obj[key];
		maxkey=key;
		  }
		  
		}
		alert("maxkey:"+maxkey+"\n"+"maxvalue:"+maxvalue)
	}
	
	