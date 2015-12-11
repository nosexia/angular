define([
    './directiveModule'
],function(module){
    //1.ng-class填坑
    //ng-class对应的对象里面，不能有空格，不然会被解析为引号
    //下面为正确写法
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