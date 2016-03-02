define([
    'angular',
    'directive/directiveModule',
    'directive/myDirective',
    'filter/filterModule',
    'filter/momentFilter'
],function(angular, directiveModule, myDirective, filterModule, momentFilter){      
    //定义一个模块需要有两个参数“模块名”, “依赖数组”
   var myApp = angular.module('myApp', ['directiveModule', 'filterModule']); 
   myApp.controller('myController', ['$scope', '$sce', function($scope, $sce){
        $scope.myAge = $sce.trustAsHtml('<a href="https://www.baidu.com">百度一下</a>');
        $scope.isActive = true;
   }]);

});