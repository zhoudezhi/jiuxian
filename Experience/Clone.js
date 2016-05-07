// JavaScript Document
/* 
* Clone   深度克隆对象/数组
* Copyright (c) 2013 某年某月  
* Date: 2013-05-26
* 
*/

function objClone(obj) {    //克隆对象
    var newObj ;
	if(obj.constructor==Object){
		newObj= new obj.constructor(); 
		}
	else{
		newObj= new obj.constructor(obj.valueof())
		}
    for (var key in obj) {
        if (newObj[key] != obj[key]) {
            if (typeof(obj[key]) == 'object') {
                newObj[key] = objClone(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.toString = obj.toString;
    newObj.valueOf = obj.valueOf;
    return newObj;
}

function arrayClone(arrOrobj,deep) {        //克隆数组
    if (arguments.length == 1) {
        var deep = false;   //浅表克隆
    } else if (arguments.length == 2) {
        var deep = true;    //深度克隆
    } else {
        throw new Error("参数数量不正确！");

    }

    var newArray = arrOrobj instanceof Array ? [] : {};
    if (deep) {
        for (var i in arrOrobj) {
            var prop = arrOrobj[i];
            if (typeof prop == "object") {
                if (prop instanceof Array) {
                    newArray[i] = [];
                    for (var j = 0; j < prop.length; j++) {
                        if (typeof prop[j] == "object") {
                            newArray[i].push(arrayClone(prop[j],true));
                        } else {
                            newArray[i].push(prop[j]);
                        }

                    }

                } else {
                    newArray[i] = arrayClone(prop,true);
                }

            } else {
                newArray[i] = prop;
            }

        }

    } else {

        newArray = arrOrobj.concat();
    }

    return newArray;

}