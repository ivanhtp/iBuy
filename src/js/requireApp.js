require.config({
    baseUrl: 'js',
    urlArgs: "v="+appVersion,
    waitSeconds: 0,
    paths: {
        // App
        'app': 'app',

        //Angular
        'angular': '../vendors/angular/angular.min',
        'angular-route': '../vendors/angular-route/angular-route.min',
        /* TODO This is just an example 'no-backend'project. Not needed. */
        'angular-resource': '../vendors/angular-resource/angular-resource.min',
        'angular-messages': '../vendors/angular-messages/angular-messages.min',
        'angular-animate': '../vendors/angular-animate/angular-animate.min',
        'angular-sanitize': '../vendors/angular-sanitize/angular-sanitize.min',
        /* TODO Only for multi language project */
        //'angular-translate': '../vendors/angular-translate/angular-translate.min',
        //'angular-translate-files': '../vendors/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'angular-css': '../vendors/angular-css/angular-css.min',
        'angular-bootstrap': '../vendors/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-toast': '../vendors/ngtoast/dist/ngToast.min',

        //Bootstrap
        'bootstrap': '../vendors/bootstrap-sass/assets/javascripts/bootstrap.min',

        //jQuery
        'jquery': '../vendors/jquery/dist/jquery.min',

    },
    shim: {
        //Angular
        'angular': { exports: 'angular'},
        'angular-route': { deps:['angular'] },
        //'angular-resource': { deps:['angular'] },
        'angular-messages': { deps:['angular'] },
        'angular-animate': { deps:['angular'] },
        'angular-sanitize': {deps: ['angular']},
        //'angular-translate': { deps:['angular'] },
        //'angular-translate-files': {deps: ['angular-translate']},
        'angular-bootstrap': { deps:['angular', 'bootstrap'] },
        'angular-toast': {deps: ['angular', 'bootstrap', 'angular-sanitize']},
        'bootstrap': { deps: ['jquery'] },

        //App
        'app': {
            deps: [
                'bootstrap',
                'angular',
                'angular-route',
                //'angular-resource',
                'angular-messages',
                'angular-animate',
                //'angular-translate',
                //'angular-translate-files',
                'angular-bootstrap',
                'angular-toast'
            ]
        }
    }
});

// Bootstrap
require([
    'app',
    'services/authApp',
    'directives/ptFocusMe',
    'controllers/toolbar',
    'controllers/sidenav'

], function(App){
    angular.bootstrap(document, ['App']);
});