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
});