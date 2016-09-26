define([],function(){
    return {
            // 对httpProvider服务类修改, 后面的$http实例都产生影响
            modifyHttpRequest : function($httpProvider){
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                var query = [];
                // transformRequest方法，请求时进行数据转化
                $httpProvider.defaults.transformRequest = function(data){
                    for(var attr in data){
                        query.push( decodeURIComponent(attr) + '=' + decodeURIComponent(data[attr]) );
                    }
                    return query.join('&');
                };
            }            
        };
});