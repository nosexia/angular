define([
    './directiveModule'
],function(module){
    module.directive('myDirective', function(){
        //指令参数restrict, 用来指定指令的使用类型，默认是标签(A)的方式
        //参数template:用来指定指令模版
        return {
            restrict: 'A',
            template: '<div class="name">nose</div>'      
        };
    });
});