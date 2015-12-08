define([
    'angular',
    'controller/controllerModule'
],function(angular, controllerModule){
    //myApp模块依赖controllerModule模块
   var myApp = angular.module('myApp', ['controllerModule']);
   return myApp; 
});