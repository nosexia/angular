define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective'
],function(angular, directiveModule, myDirective){      
    //myApp模块依赖directiveModule模块
   var myApp = angular.module('myApp', ['directiveModule']); 
   return myApp; 
});