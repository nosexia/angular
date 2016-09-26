define([
    
], function(){
    return ['eat', 'testHttpService', 'testHttpService1','$http', function(eat, testHttpService, testHttpService1, $http){
        // 封装一个简单的服务
        testHttpService();
        testHttpService1();
    }];
});