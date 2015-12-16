define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective',
    'filter/filterModule',
    'filter/momentFilter'
],function(angular, directiveModule, myDirective, filterModule, momentFilter){      
    //myApp模块依赖directiveModule模块
   var myApp = angular.module('myApp', ['directiveModule', 'filterModule']); 
   myApp.controller('myController', ['$scope', function($scope){
        $scope.myAge = '23';
        $scope.isActive = true;
   }]);

   return myApp; 
});