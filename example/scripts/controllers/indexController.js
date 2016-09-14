define([
    
], function(){
    return ['$rootScope', '$scope', '$timeout', '$q', function($rootScope, $scope, $timeout, $q){
        // $providerCache.$rootScope = this.$get()返回值
        // var defer = $q.defer();
        // defer.promise.then(function(){
        //     alert('1111');
        // });

        // defer.resolve();

        // $timeout.cancel(timeoutPromise);
        $scope.value = '1';

        setTimeout(function(){
            $scope.value = 0;
            $rootScope.$digest();
        });
    }];
});