define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController',
    'angular-route'
],function(angular, controllerModule, detailController, listController, ngRoute){
   var myApp = angular.module('myApp', ['controllerModule', 'ngRoute']);
   myApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider){
        //注入内置服务$locationProvider
        console.log($locationProvider);
   }]); 
   return myApp; 
});