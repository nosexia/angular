define([
    'angular',
    'controller/controllerModule',
    'controller/detailController',
    'controller/listController',
    'angular-route'
],function(angular, controllerModule, detailController, listController, ngRoute){
   var myApp = angular.module('myApp', ['controllerModule', 'ngRoute']);
   myApp.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
        //添加两个路由项，'/detail', '/list'
        $routeProvider.when('/detail',{
            controller: 'detailController',
            templateUrl: 'detailTpl'
        }).when('/list',{
            controller: 'listController',
            templateUrl: 'listTpl'
        });
   }]); 
   return myApp; 
});