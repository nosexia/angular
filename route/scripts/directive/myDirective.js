define([
    './directiveModule'
],function(module){
    //ng-class最后一个参数布尔值, 全等true, false
    module.directive('myDirective', function(){
        return {
            restrict: 'A',
            template: '<div ng-class='+'{true:"active",false:"inactive"}[true]'+'></div>',
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