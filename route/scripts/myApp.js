define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective'
],function(angular, directiveModule, myDirective){      
    //myApp模块依赖directiveModule模块
   var myApp = angular.module('myApp', ['directiveModule']); 
   myApp.controller('myController', ['$scope', function($scope){
        $scope.myAge = '23';
        $scope.isActive = true;
   }]);
   return myApp; 
});