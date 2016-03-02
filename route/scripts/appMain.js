require([
    'angular',
    'myApp'    
],function(angular){  
    //'myApp'是定义在myApp.js中的模块名
    angular.bootstrap(document.body, ['myApp']);
});