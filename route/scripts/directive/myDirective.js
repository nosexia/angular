define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //参数replace，是否用当前模版，替换当前元素
        return {
            restrict: 'A',
            template: '<div class="name">nose</div>',
            replace: true   
        };
    });
});