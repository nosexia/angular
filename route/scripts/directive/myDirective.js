define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //ng-repeat-start指令，可以解析包含指令本身的标签
        //ng-repeat-start和 ng-repeat-end是已一对标签出现的形式
        return {
            restrict: 'A',
            template: '<div ng-repeat-start="item in testArray" ng-repeat-end value="{{item}}" ></div>',
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