define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController',
    'angular-route'
],function(angular, controllerModule, detailController, listController, ngRoute){
   var myApp = angular.module('myApp', ['controllerModule', 'ngRoute']);
   //$routeProvider属于ngRoute模块的一个服务
   //注入routeProvider服务到myApp模块中
   myApp.config(['$httpProvider', '$routeProvider',  function($httpProvider, $routeProvider){
        console.log($routeProvider);
   }]); 
   return myApp; 
});