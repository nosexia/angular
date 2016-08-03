define([
    
], function(){
    return ['$scope', function($scope){
        $scope.highLight = 1;
        $scope.update = 0;
        // $watch加入第三个参数时，必须全等时，才不执行回调（值相等，引用相同）
        $scope.$watch('user', function(newValue, oldValue){
            if(newValue === oldValue) return;
            $scope.update ++;
        },true);
    }];
});