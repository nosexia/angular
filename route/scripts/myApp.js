define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective',
    'filter/filterModule',
    'filter/momentFilter'
],function(angular, directiveModule, myDirective, filterModule, momentFilter){      
    //引入$sce内部服务，把字符串转为信任的html
   var myApp = angular.module('myApp', ['directiveModule', 'filterModule']); 
   myApp.controller('myController', ['$scope', '$sce', function($scope, $sce){
        $scope.myAge = $sce.trustAsHtml('<a href="https://www.baidu.com">百度一下</a>');
        $scope.isActive = true;
   }]);

});