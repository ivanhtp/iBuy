require.config({
    baseUrl: 'js',
    urlArgs: "v="+appVersion,
    waitSeconds: 0,
    paths: {
        //Angular
        'angular': '../vendors/angular/angular.min',
        'angular-messages': '../vendors/angular-messages/angular-messages.min',
        'angular-animate': '../vendors/angular-animate/angular-animate.min',
        /* TODO Only for multi language project */
        //'angular-translate': '../vendors/angular-translate/angular-translate.min',
        //'angular-translate-files': '../vendors/angular-translate-loader-static-files/angular-translate-loader-static-files.min',

    },
    shim: {

        //Modernizr
        'modernizr': { exports: 'Modernizr' },

        //Angular
        'angular': { exports: 'angular'},
        'angular-messages': { deps:['angular'] },
        'angular-animate': { deps:['angular'] },
        //'angular-translate': { deps:['angular'] },
        //'angular-translate-files': {deps: ['angular-translate']},

        //App
        'login': {
            deps: [
                'angular',
                'angular-messages',
                //'angular-translate',
                //'angular-translate-files'
            ]
        }
    }
});

// Bootstrap
require([
        'login',
    ], function(login){
        angular.bootstrap(document, ['Login']);
});