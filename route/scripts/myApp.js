define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective',
    'moment'
],function(angular, directiveModule, myDirective, moment){      
    //myApp模块依赖directiveModule模块
   var myApp = angular.module('myApp', ['directiveModule']); 
   myApp.controller('myController', ['$scope', function($scope){
        $scope.myAge = '23';
        $scope.isActive = true;
   }]);

   console.log(moment);

   return myApp; 
});