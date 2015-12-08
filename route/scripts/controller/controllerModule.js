require([
    'angular',
    './detailController',
    './listController'
],function(angular, detailController, listController){
    var controllerModule = angular.module('controllerModule.js', ['detailController', 'listController']);
});