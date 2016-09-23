define([
    'angular',
    'controllers/indexController',
    'service/moduleServices'
], function(angular, indexController){
    var myApp = angular.module('myApp', ['moduleService']);
    myApp.controller('indexController', indexController);
});