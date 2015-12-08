require([
    'angular',
    'myApp'    
],function(angular, myApp){
     //手动式启动angular
     //执行myApp.js文件中的'myApp'模块 
     angular.bootstrap(document, ['myApp']);   
});