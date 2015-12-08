define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController'
],function(angular, controllerModule, detailController, listController){
    //myApp模块依赖controllerModule模块
   var myApp = angular.module('myApp', ['controllerModule']);
   //注入内置服务$httpProvider
   myApp.config(['$httpProvider', function($httpProvider){
        
   }]); 
   console.log(myApp);
   //配置路由
   return myApp; 
});