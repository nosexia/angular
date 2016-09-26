define([
    'angular'
],function(angular){
    var module = angular.module('moduleService', []);
    // 需要一个实例化对象，调用service方法
    module.service('eat', function(){
        this.eat = function(){

        };

        this.drink = function(){

        };
    });
    

    module.factory('testHttpService', ['$http', function($http){
        return function(){
            $http.get('index.php', {
                params : {
                    'name' : 'nose'
                }
            });
        };
    }]);

    module.factory('testHttpService1', ['$http', function($http){
        return function(){
            return $http.post('index.php', {name : [1, 2,3]});
        };
    }]);



});