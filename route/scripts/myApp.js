define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController',
    'directive/directiveModule',
    'angular-route'
],function(angular, controllerModule, detailController, listController, directiveModule, ngRoute){      
   var myApp = angular.module('myApp', ['controllerModule', 'directiveModule', 'ngRoute']);         //myApp模块依赖directiveModule模块
   myApp.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
        $routeProvider.when('/',{
            controller: 'detailController',
            templateUrl: 'detailTpl'
        }).when('/list',{
            controller: 'listController',
            templateUrl: 'listTpl'
        });
   }]); 
   return myApp; 
});