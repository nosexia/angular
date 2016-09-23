define([
    'angular'
],function(angular){
    var module = angular.module('moduleService', []);
    module.factory('eat', function(){
        return {
            'name' : 'nose'
        };
    });
});