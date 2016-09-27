define([
    'angular',
    'service/initModule',
    'controllers/indexController',
    'controllers/editController',
    'service/moduleServices',
    'angular-route'
], function(angular, init, indexController, editController){
    var myApp = angular.module('myApp', ['ngRoute', 'moduleService']);
    myApp.controller('indexController', indexController);
    myApp.controller('editController', editController);
    // 通过myApp.config可以注入一个服务类， 返回$httpProvider的实例,
    // 添加一个路由"/edit/:id"
    myApp.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
        init.modifyHttpRequest($httpProvider);
        $routeProvider.when('/', {
            controller : 'indexController',
            template : '<div>默认</div>'
        }).when('/edit/:id', {
            controller : 'editController',
            template : '<div>编辑</div>'
        });
    }]);
});