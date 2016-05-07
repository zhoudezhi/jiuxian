// JavaScript Document
/* 
* toStr    随机调换字符串中的两个字母位置（开头结尾除外）
* Copyright (c) 2013 某年某月  
* Date: 2013-04-24 
* 
*/
function  toStr(str){
var i,random1,random2,temp;
var word=new Array();
word=str.split(" ");
var length=word.length;
for(i=0;i<length;i++)
{
	if(word[i].length<=2)
	{
		continue;
		}
	random1=Math.floor(Math.random()*(word[i].length-2))+1;
	random2=Math.floor(Math.random()*(word[i].length-2))+1;
	if(random1==random2)
	{
		random2=Math.floor(Math.random()*(word[i].length-2))+1;
		}
	temp1=word[i].charAt(random1);
	temp2=word[i].charAt(random2);

	temp=word[i].replace(temp1,temp2);
	temp=word[i].replace(temp2,temp1);
	word[i];
	}
	return word.join(" ");

}