define([
    'angular',
    'service/initModule',
    'controllers/indexController',
    'service/moduleServices'
], function(angular, init, indexController){
    var myApp = angular.module('myApp', ['moduleService']);
    myApp.controller('indexController', indexController);
    myApp.config(['$httpProvider', function($httpProvider){
        init.modifyHttpRequest($httpProvider);
    }]);
});