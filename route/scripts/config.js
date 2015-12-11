var require = {
    baseUrl: 'scripts',
    urlArgs: 'v=' + new Date().getTime(),
    paths: {
        angular: 'angular',
        'angular-route': 'angular-route.min'
    },
    shim: {
        angular:{
            exports: 'angular'
        },
        'angular-route': ['angular']

    }
};   