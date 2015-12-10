define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //myAge的值，指定myControlller作用域中的myAge变量， 用标识符'='
        //在指令模块下面，声明独立作用域
        return {
            restrict: 'A',
            template: '<div >{{myName}} || {{myAge}}</div>',
            replace: true,
            scope: {
                myName: '@',
                myAge: '='         
            }   
        };
    });
});