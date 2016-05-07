// JavaScript Document
/* 
* AJAX实例
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/

//==========================步骤(1)===========================//
//创建XMLHttpRequest对象


function GetXmlHttpObject(){
	var xmlHttp=null;
try
 {
 // Firefox, Opera 8.0+, Safari
 xmlHttp=new XMLHttpRequest();
 }
catch (e)
 {
 // Internet Explorer
 try
  {
  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
 catch (e)
  {
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 }
 
 return xmlHttp;
}

function Send()
{
var xmlHttp=GetXmlHttpObject();
//==========================步骤(2)===========================//
//创建一个回调函数响应状态变化
xmlhttp.onreadystatechange = Change; 

//==========================步骤(3)===========================//
//打开链接，发送数据请求 
xmlhttp.open(method, url, asyncFlag);    
//method:GET;POST;PUT;PROPFIND等
//url:绝对路径或者相对路径
//asyncFlag：可选参数，默认值为true，使用异步方式发送请求。false，立即返回数据。
xmlhttp.send();


}

//==========================步骤(4)===========================//
//响应状态变化 
function Change() 
{
    if (xmlhttp.readyState == 0) {
        //对象尚未初始化，这是最初的状态，open方法尚未被调用
    }
    else if (xmlhttp.readyState == 1) {
        //对象已经创建，send方法尚未调用
        //可以给用户一段提示信息，如数据正在加载，请稍候
    } else if (xmlhttp.readyState == 2) {
        //已经调用send方法，但响应主题尚未达到
    } else if (xmlhttp.readyState == 3) {
        //与服务器交互过程中，部分数据已经到达，但还不可以访问
    } else if (xmlhttp.readyState == 4) {
        //全部数据已经达到，可以开始访问数据
        GetResult(); //用于处理返回的数据
    }
}

//==========================步骤(5)===========================//
//处理返回结果 
function GetResult()
{
    if (xmlhttp.status == 200) {
        try {
            var msg = xmlhttp.responseText;
            return msg;
        } catch(err) {
            alert(err.message);
        }
    } else if (xmlhttp.status == 404) {
        alert("没有发现请求的文档!");
    } else if (xmlhttp.status == 500) {
        alert("服务器内部错误！");
    }

}