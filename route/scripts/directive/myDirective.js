define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //myName的值，对应字符串"nose"，用'@'
        //在指令模块下面，声明独立作用域
        return {
            restrict: 'A',
            template: '<div >{{myName}}</div>',
            replace: true,
            scope: {
                myName: '@'         
            }   
        };
    });
});