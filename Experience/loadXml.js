// JavaScript Document
/* 
* 加载解析XML文件或XML字符串
* Copyright (c) 2013 某年某月  
* Date: 2013-05-20
* 
*/

function loadXMLDoc(url) {       //解析XML文件

    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    } catch(e) {
        try {
            xmlDoc = document.implementation.createDocument("", "", null);
        } catch(e) {
            alert(e.message);
        }
    }

    try {
        xmlDoc.async = false;
        xmlDoc.load(url);
        return xmlDoc;

    } catch(e) {
        alert(e.message);
        
    }
	return null;
}

function loadXMLString(string) {         //解析XML字符串
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(string);
        return xmlDoc;
    } catch(e) {
        try {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(string, "text/xml");
            return xmlDoc;

        } catch(e) {
            alert(e.message);
        }
    }
    return null;

}