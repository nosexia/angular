var require = {
    baseUrl: 'scripts',
    urlArgs: 'v=' + new Date().getTime(),
    paths: {
        angular: 'angular',
        'angular-route': 'angular-route.min',
        'moment': 'moment-2.8.1-with-locale'
    },
    shim: {
        angular:{
            exports: 'angular'
        },

        moment:{
            exports: 'moment'
        },

        'angular-route': ['angular']

    }
};   