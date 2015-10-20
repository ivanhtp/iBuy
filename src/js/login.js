define([], function(){

    /**
     *
     * SHOPPING LIST -  LOGIN MODULE
     * Description: Test app for Bluesoft
     *
     * Author: Ivan Pauletti | @ivanhtp
     * https://github.com/ivanhtp
     **/

    'use strict';

    var Login = angular.module('Login', ['ngMessages']);


    /**
     * ShoppingList Contants
     * @contant
     */
    Login.constant(
        "CONST_ENDPOINT","/1.0/api/"
    );

    /**
     * Login Controller
     * @dependency $window
     * @dependency $http
     * @dependency $location
     * @dependency $log
     * @dependency $animate
     * @dependency $translate
     */

    Login.controller('LoginCtrl', ['$scope', '$window', '$http', '$location', '$log', '$animate', 'CONST_ENDPOINT',
        function($scope, $window, $http, $location, $log, $animate, CONST_ENDPOINT) {

            /**
             * Change current language
             * @params key = Current language prefix ('en', 'pt', 'es', ...)
             */
            /*$scope.changeLanguage = function (key) {
                $translate.use(key);
            };*/


            /**
             * 1. Request Login
             */
            $scope.requestLogin = function () {
                // Errors
                $scope.formErrors = [];

                if ($scope.loginForm.$valid) {

                    $scope.LOADING = true;

                    var basicAuth = $window.btoa($scope.LOGIN + ':' + $scope.PASSWORD);

                    $log.info("LoginCtrl.requestLogin => basicAuth: " + basicAuth);

                    $scope.handleLoginSuccess();

                    /*TODO Backend for login
                    var requestObj = {

                        method: "POST",
                        url: CONST_ENDPOINT+"Login/",
                        headers: {
                            'Authorization': 'Basic ' + basicAuth
                        }
                    };

                    // Request
                    $http(requestObj)
                        //Response
                        .success($scope.handleLoginSuccess)
                        .error($scope.handleLoginError)
                        */
                } else {
                    $scope.LOADING = false;
                    $scope.formErrors.push("Há erros no preenchimento do formulário...");
                }

            };


            /**
             * 2a. Succeeded Login
             * @param data
             */
            $scope.handleLoginSuccess = function(data) {

                if (!data){ data == 'Login fake'}

                $log.debug("Login.handleLoginSuccess | Data: "+ data);
                $window.localStorage["sl.UserName"] = "User";


                $scope.redirectToApp();
            };


            /**
             * 2b. Failed Login
             * @param data
             */
            $scope.handleLoginError = function(data, status) {
                $log.debug("Login.handleLoginError | Status: "+ status)
                $scope.LOADING = false;
                $scope.formErrors.push(status+": "+data);

            };


            /**
             * 3. Redirects to App Page
             */
            $scope.redirectToApp = function() {
                $log.debug("Login.redirectToApp ");

                window.location = "app.html";

            };


            /**
             * Run first
             */
            if ($location.search().expired){
                $scope.toastSessionExpired();
            }
    } ]);


    /**
     * Focus element input just after loading DOM
     *
     * Usage: <input type="text" dt-focusme >
     **/

    Login.directive('dtFocusme', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.focus();
            }
        };
    });

    /**
     * Login Configuration
     * @dependency $logProvider
     * @dependency $locationProvider
     * @dependency $translateProvider
     */
    Login.config(['$logProvider', '$locationProvider',
        function( $logProvider, $locationProvider) {
            /**
             * LOG PROVIDER
             * Defines if application should show logs or not
             **/
            $logProvider.debugEnabled(false);


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

        }
    ]);

    return Login;
})

