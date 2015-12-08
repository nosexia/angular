require([
    'angular',
    'myApp'    
],function(angular, myApp){  
    //myApp模块解析html中body
    angular.bootstrap(document.body, ['myApp']);
});