define([
    'angular',
    './filterModule'
],function(angular, module){
    // 在module下面声明moment过滤器 
   module.filter('moment', [function(){
        // 返回值是一个函数
        return function(value){
            return value*10;
        };
    }]);
});