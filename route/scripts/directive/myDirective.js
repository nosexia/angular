define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //ng-repeat指令 只能解析指令里面的内容
        return {
            restrict: 'A',
            template: '<div ng-repeat="item in testArray">{{item}}</div>',
            replace: true,
            scope: {
                myName: '@',
                myAge: '='         
            },
            link: function($scope, element){
                $scope.testArray = [1, 2, 3];
            }   
        };
    });
});