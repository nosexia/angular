/**
 * Created by nose on 15-7-28.
 */
require([
    'domReady!',
    'angular',
    'app/platelist/plateListApp',
    'app/common/commonRun'
], function(doc, angular, app){
    angular.bootstrap(document.body, ['plateListApp']);
});