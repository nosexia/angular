define([
    'angular',
    './filterModule'
],function(angular, module){
    //自定义过滤器
   module.filter('moment', [function(){
        //返回的值是一个函数, 返回的值是一个函数 , 返回的值是一个函数
        return function(value){
            return value;
        };
    }]);
});