/**
 * Created by nose on 2015-07.
 */
define([
    "angular",
    "app/common/params",
    "angular-route",
    "./controllers/controllerModule",
    "./controllers/listController",
    './controllers/editController',
    './directives/stockListDirective',
    "./services/serviceModule"
], function(angular, params){
    //需要引入控制器模块
    var app = angular.module("plateListApp",["ngRoute", "ngResource", "plateListServices", "controllerModule", 'stockListDirective']);
    app.config(["$routeProvider", "$httpProvider",
    	function($routeProvider, $httpProvider){
    		$routeProvider.when("/cate/:tid",{
                controller: "listController",
                templateUrl:  "view_list.tpl",
                resolve:{
                    dataList: ["$route", "plateListLoader",  function($route, plateListLoader){
                        return plateListLoader({tid: $route.current.params.tid || 9700600});
                    }],
                    loader : "plateListLoader"
                }
            }).when("/edit/:tid",{
                controller: "editController",
                templateUrl: "view_edit.tpl",
                resolve:{
                    dataEdit: ["$route", "plateEditLoader",function($route, plateEditLoader){
                        return plateEditLoader($route.current.params.tid);
                    }],

                    dataChengList: ["$route", "ChengListLoader" , function($route, ChengListLoader){
                        return ChengListLoader({tid: $route.current.params.tid});
                    }],

                    loader: "ChengListLoader"
                }
            }).otherwise({
                redirectTo: "/cate/9700699"
            })
    	}


    ])
    return app;
});



//1.
//services/serviceModule文件放入所有关于server端请求


//2
//var app = angular.module("plateListApp",["ngRoute", "ngResource", "plateListServices", "controllerModule", 'stockListDirective']);
//把模块ngRoute, ngResource, plateListServices, controllerModule, stockDirective注入plateListApp模块，
//plateListApp可以引用依赖模块中的方法,控制器
//依赖模块之间方法也可以互相引用,
//