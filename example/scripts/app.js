define([
    'angular',
    'controllers/indexController'
], function(angular, indexController){
    var myApp = angular.module('myApp', []);
    myApp.controller('indexController', indexController);

    // myApp.run 自动跑run方法
    myApp.run(['$rootScope', function($rootScope){
        console.log('开始跑了噢');
    }]);
});