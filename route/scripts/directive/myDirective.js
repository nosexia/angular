define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //link参数，指令内部实现dom编程
        //在指令模块下面，声明独立作用域
        return {
            restrict: 'A',
            template: '<div >{{myName}} || {{myAge}}</div>',
            replace: true,
            scope: {
                myName: '@',
                myAge: '='         
            },
            link: function($scope, element){
                //element为angular分装的dom对象
                element.on('click', function(){
                    alert('1111');
                })
            }   
        };
    });
});