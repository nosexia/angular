var require = {
    baseUrl: 'scripts',
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