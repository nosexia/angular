define([
    'angular',
    'controller/controllerModule',
    'controller/detailController'
],function(angular, controllerModule){
    //myApp模块依赖controllerModule模块
   var myApp = angular.module('myApp', ['controllerModule']);
   //myApp.config中参数为数组，对应注入服务和函数
   myApp.config(['$routeProvider', 'httpProvider', function($routeProvider, $httpProvider){
        
   }]) 
   //配置路由
   return myApp; 
});