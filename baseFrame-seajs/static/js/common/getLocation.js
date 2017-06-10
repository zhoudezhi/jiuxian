// JavaScript Document
/* 
* H5定位
* Copyright (c) 2017 某年某月  
* Date: 2017-05-20
* 
*/
define(function(require,exports,module){
    var $ = require('zepto');
    /*
     朝林广场ios定位 {"coord_type":"2","longitude":"116.505674","latitude":"39.793242"}
     朝林广场Safari定位发送 {"longitude":116.49971450626151,"latitude":39.79195208558683,"coord_type":"
     */
    // 参数checkLocal表示若本地存在缓存，则使用本地缓存. 若为false，则强制重新设备位置
    return function getLocation(){
        return $.Deferred(function(d){   
            // 太小经常会在第一次进入页面时报告定位失败，手动点击一下又可以获取到定位，
            // 之前未出现过这种情况，猜测可能是初始时时间太短(500毫秒时会出现)
            // 也可能是因为

            // timeout时间值的设定：
            // 在ios设备上，几乎总是在500ms内便可获取到gps，
            // 但在有些android机上，1600ms会导致因过早终止而获取不到，
            // 因此保守的设置为5000ms
            if (navigator && navigator.geolocation) {
                // 20s后，无论用户是否点击了弹出框中的"允许""不允许"，都reject()一次
                // 需要注意的是，弹框显示的过程中，等待的时间也计算在内
                // 详情查看http://jira.jd.com/browse/OO-13493
                setTimeout(function(){
                    d.reject();
                },20000);
                try{
                    navigator.geolocation.getCurrentPosition(function(position){
                        var coords = (position||{}).coords;
                        if (isValidCoords(coords)) {
                            //getLocation.savedCoords_ = coords;
                            //sessionstore.setItem(key,coords);
                            d.resolve(coords);
                        } else {
                            d.reject();
                        }
                    },function(error){
                        //d.resolve(error);
                        d.reject(error);
                        // andriod 获取不到位置
                    },{
                        enableHighAcuracy: true,
                        timeout:5000,
                        maximumAge: 3000
                    });
                } catch(e){
                    d.reject(e);
                }
            } else {
                d.reject();
            }
        });
    }
    //exports.getLocation = getLocation;
})


