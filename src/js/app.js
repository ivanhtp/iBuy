define(['routes/routes','routes/resolver'], function(config, resolver){

    /**
     *
     * SHOPPING LIST -  APP MODULE
     * Description: Test app for Bluesoft
     *
     * Author: Ivan Pauletti | @ivanhtp
     * https://github.com/ivanhtp
     **/

    'use strict';

    var App = angular.module('App', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngToast', 'ui.bootstrap']);


    /**
     * App Contants
     * @contant
     */
    App.constant(
        "CONST_ENDPOINT","/1.0/api/"
    );

    /**
     * App Configuration
     * @dependency $logProvider
     * @dependency $routeProvider
     * @dependency $locationProvider
     * @dependency $routeProvider
     * @dependency $controllerProvider
     * @dependency $compileProvider
     * @dependency $filterProvider
     * @dependency $httpProvider
     * @dependency $provide
     */
    App.config(['$logProvider', '$routeProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$httpProvider', '$provide', 'ngToastProvider',
        function($logProvider, $routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide, ngToastProvider) {


            App.controller = $controllerProvider.register;
            App.directive  = $compileProvider.directive;
            App.filter     = $filterProvider.register;
            App.factory    = $provide.factory;
            App.service    = $provide.service;


            /**
             * LOG PROVIDER
             * Defines if application should show logs or not
             **/
            $logProvider.debugEnabled(false);

            /**
             * ROUTE PROVIDER
             * Maps all routes and pages used in application. In this case we loop in a
             * external file (src/js/routes/routes.js) for AMD purposes.
             **/
            //Loop into a route file (src/routes/routes.js)
            if(config.routes !== undefined){
                angular.forEach(config.routes, function(route, path){
                    $routeProvider.when(path, {
                        templateUrl:route.templateUrl,
                        controller:route.controller,
                        resolve:resolver(route.dependencies)
                    });
                });
            }
            $routeProvider.otherwise({
                redirectTo: '/shopping-list'
            });



            /**
             * LOCATION PROVIDER
             * Sets angular redirect mode
             **/
            $locationProvider.html5Mode(false).hashPrefix('!');



            /**
             * TRANSLATE PROVIDER
             * Maps translation filename pattern (further located in /i18n folder) and
             * sets the preferred application language
             **/
            /*$translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',
                suffix: '.js'
            });
            $translateProvider.preferredLanguage('pt-BR');*/

            /**
             * TOASTS PROVIDER
             * Defines configuration for toasts
             **/
            ngToastProvider.configure({
                animation: 'slide', // or 'fade',
                verticalPosition: 'bottom'
            });

            /**
             * HTTP INTERCEPTORS
             * Listen to EVERY http request in order to manage authentication
             * expiration, server errors and redirects to login.
             **/
                // Default header for all requests
            $httpProvider.defaults.headers.common['Authorization'] = window.localStorage["pt.Token"],
                $httpProvider.defaults.headers.common['Accept-Language'] = 'pt-BR' ;


            // Iinterceptors
            $httpProvider.interceptors.push(['$q', '$location', '$window', 'authApp', function($q, $location, $window, authApp) {

                return {
                    // SUCCESS REQUEST
                    'request': function (config) {
                        if (window.localStorage["pt.Token"]) {
                            // Default header for all requests
                            //console.log('PT-Token ' + $window.localStorage["pt.Token"]);

                        }
                        return config;
                    },

                    /* // ERROR REQUEST
                     'requestError': function (rejection) {
                     // do something on error
                     if (canRecover(rejection)) {
                     return responseOrNewPromise
                     }
                     return $q.reject(rejection);
                     },*/


                    // SUCCESS RESPONSE
                    'response': function (response) {
                        // do something on success
                        return response;
                    },

                    // ERROR RESPONSE
                    'responseError': function (response) {
                        // authentication issue
                        if (response.status === 403) {
                            // Redirects to login if session expires
                            authApp.clearSession();
                        }
                        return $q.reject(response);

                    }
                };
            }]);
        }
    ]);


    /**
     * Runs on module initialization
     * @param  $http
     * @return void
     */
    App.run(['$http', function($http) {
        //Trick to remove Addressbar on mobile browsers
        window.scrollTo(0,1);

        //Trigger offcanvas
        $(document).ready(function () {
            $('[data-toggle="offcanvas"]').click(function () {
                $('.row-offcanvas').toggleClass('active')
            });
        });
    }]);



    return App;
});

