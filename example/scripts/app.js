define([
    'angular',
    'service/initModule',
    'controllers/indexController',
    'service/moduleServices'
], function(angular, init, indexController){
    var myApp = angular.module('myApp', ['moduleService']);
    myApp.controller('indexController', indexController);
    // 通过myApp.config可以注入一个服务类， 返回$httpProvider的实例
    myApp.config(['$httpProvider', function($httpProvider){
        init.modifyHttpRequest($httpProvider);
    }]);
});