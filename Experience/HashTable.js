// JavaScript Document
/* 
* HashTable   哈希表   操作对象
* Copyright (c) 2013 某年某月  
* Date: 2013-05-26
* 
*/

function HashTable() {
    this._hash = {};
    this._count = 0;

    /*添加或更新key*/
    this.put = function(key, value) {
        if (this._hash.hasOwnProperty(key)) {
            this._hash[key] = value;
            return true;
        } else {
            this._hash[key] = value;
            this._count++;
            return true;
        }
    }

    /*获取指定key的值*/
    this.get = function(key) {
        if (this._hash.hasOwnProperty(key)) {
            return this._hash[key];
        }
    }
    /*获取元素个数*/
    this.size = function() {
        return this._count;
    }

    /*检查是否为空*/
    this.isEmpty = function() {
        if (this._count > 0) {
            return false ;
        } else {
            return true;
        }
    }

    /*检查是否包含指定的key*/
    this.containsKey = function(key) {
        return this._hash.hasOwnProperty(key);
    }

    /*检查是否包含指定的value*/
    this.containsValue = function(value) {
        for (var temp in  this._hash) {
            if (this._hash[temp] == value) {
                return true;
            } 
                
         }
			return false;
        

    }

    /*删除指定key*/
    this.remove = function(key) {
        delete this._hash[key];
        this._count--;

    }

    /*清楚所有key*/
    this.removeAll = function() {
        this._hash = {};
        this._count = 0;

    }

    /*从HashTable中获取key的集合，以数组形式返回*/
    this.KeySet = function() {
        var arrKey = new Array();
        for (var temp in this._hash) {
            arrKey.push(temp);
        }
        return (arrKey.length == 0) ? null: arrKey

    }

    /*从HashTable中获取value的集合，以数组形式返回*/
    this.ValueSet = function() {
        var arrValue = new Array();
        for (var temp in this._hash) {
            arrValue.push(this._hash[temp]);
        }
        return (arrValue.length == 0) ? null: arrValue

    }

}