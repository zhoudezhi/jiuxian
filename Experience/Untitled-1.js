// JavaScript Document
/* 
* 创建类
* Copyright (c) 2013 某年某月  
* Date: 2013-04-24 
* 
*/

function person(name,age)
{
	this.name=name;
	this.age=age;
	this.show=function(){
		return ("name is:"+this.name+","+"age is:"+this.age)
		
		
		}
	
	
	
	}
	person.prototype.work=function(){};
var per= new person(zhou,25);
per.show();

var name={
	first:zhou,
	center:de,
	last:zhi,
	show:function(){}
	}
name.show()