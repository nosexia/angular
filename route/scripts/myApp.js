define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController',
    'angular-route'
],function(angular, controllerModule, detailController, listController, ngRoute){
    //myApp模块依赖ngRoute模块
   var myApp = angular.module('myApp', ['controllerModule', 'ngRoute']);
   //注入内置服务$httpProvider
   myApp.config(['$httpProvider', function($httpProvider){
        
   }]); 
   console.log(myApp);
   //配置路由
   return myApp; 
});