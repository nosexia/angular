define([

],function(){
    return ['$scope', function($scope){
        $scope.name = 'nose';
        $scope.importTxtFile1 = function(files){
             var file = files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                $scope.$apply(function(){
                    $scope.msg = reader.result;
                });                
            };
            if(file){
                reader.readAsText(file);
            }
        };
    }];
});