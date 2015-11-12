/**
 * Created by futu on 14-7-29.
 */

define([
    'jquery',
    'angular',
    'angular-resource',
    'i18n!nls/common'
], function($, angular){
    var module = angular.module('plateListServices', ['ngResource']);
    module.factory('plateListLoader', ['$http', function($http){
        return function(resource){
            var str = "";
                tid = resource.tid
                page = resource.page || 0;
                str+="set="+tid +"&";
                str+="page="+page;
            return $http.get('/plate-man/plate-list?'+str);
        };
    }]);


    module.factory('plateEditLoader', ['$http', function($http){
        return function(tid){
            return $http.get('/plate-man/plate-info?id='+tid);
        };
    }]);

    module.factory('ChengListLoader', ['$http', '$q', function($http, $q){
        return function(params){
            tid = params.tid;
            page = params.page || 0;
            return $http.get('/plate-man/stock-list?id='+tid +"&page="+page);
        };
    }]);

    //搜索板块接口
    module.factory('searchPlateLoader', ['$http', function($http){
    	return function(params){
    		var market = params.market;
    		var keywords = params.keywords;
    		return $http.get('/plate-man/search?keyword=' + keywords + '&market=' + market);
    	}
    }]);

    //删除板块
    module.factory('deletePalteLoader', ['$http', function($http){
    	return function(plateId){
    		return $http.get('/plate-man/delete?id=' + plateId );
    	}

    }])

    return module;


/*    module.factory('_getService', ['$q', function($q){
        return function(resource) {
            return (function(params) {
                var delay = $q.defer();
                params = params || {};
                resource.get(params, function(ret){
                    delay.resolve(ret);
                }, function(){
                    delay.reject('Unable to get page list');
                });
                return delay.promise;
            });
        };
    }]);


    module.factory('listTopic', ['$resource', function($resource){
        return $resource('/media-report/topic-list?page=:page');
    }]);

    module.factory('listTopicLoader', ['listTopic', '_getService',
        function(listTopic, _getService){
            return _getService(listTopic);
    }]);

    module.factory('viewTopicLoader', ['$http', function($http){
        return function(tid){
            return $http.get('/media-report/topic-detail?tid='+tid);
        };
    }]);

    module.factory('viewNewTopicLoader', ['$http', function($http){
        return function(){
            return $http.get('/media-report/media-list');
        };
    }]);

    module.factory('meidaList', ['$http', function($http){
        return function(){
            return $http.get('/media-report/media-list');
        };
    }]);
*/

});
