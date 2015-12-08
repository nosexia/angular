define([
    'angular',
    'controller/controllerModule',
    'controller/detailController'
],function(angular, controllerModule){
    //myApp模块依赖controllerModule模块
   var myApp = angular.module('myApp', ['controllerModule']);
   return myApp; 
});