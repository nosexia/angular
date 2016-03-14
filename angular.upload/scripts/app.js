define([
    'angular',
    'controllers/indexController'
],function(angular, indexController){
    var myApp = angular.module('myApp', []);
    myApp.controller('indexController', indexController);
});