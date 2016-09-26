define([
    
], function(){
    return ['eat', 'testHttpService', 'testHttpService1', function(eat, testHttpService, testHttpService1){
        console.log(eat);
        // 封装一个简单的服务
        testHttpService();
        testHttpService1();
    }];
});