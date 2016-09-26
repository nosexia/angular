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
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            var query = [];
            // transformRequest方法，请求时进行数据转化
            $http.defaults.transformRequest = function(data){
                for(var attr in data){
                    query.push( decodeURIComponent(attr) + '=' + decodeURIComponent(data[attr]) );
                }
                return query.join('&');
            };
            $http.post('index.php', {name : 'nose'});
        };
    }]);



});