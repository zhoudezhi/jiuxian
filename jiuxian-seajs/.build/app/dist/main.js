define("../js/app/dist/main", [ "../src/index.js", "jquery", "..\\..\\common\\toast", "template", "templateNative", "..\\..\\tpl\\page" ], function(require, exports, module) {
    //方案一优于方案二，seajs.use原则只应该有一处，用于引用入口js文件。其他地方应用require来加载模块。
    //方法一
    /*	var $ = require('jquery');
	require('../src/lazyload.js');  
	require('../src/public.js');*/
    require("../src/index");
});