define(['app'], function(App){

    /**
     * Toolbar Controller
     * @dependency $http
     * @dependency $location
     * @dependency $log
     * @dependency $window
     * @dependency $mdSidenav
     * @dependency $mdMedia
     * @dependency $translate
     * @dependency authAgent
     */

    App.controller('ToolbarCtrl', ['$scope', '$http', '$log', '$location', '$window', 'authApp',
        function($scope, $http, $log, $location, $window, authApp) {
            //Validates current page BUT NOT FOR THIS TEST PURPOSE
            //authApp.checkAuthentication();


            /**
             * Log Out
             */
            $scope.logOut = function () {
                authApp.clearSession();
            };




            /**
             * Run Immediately
             */
            $scope.USER_NAME = $window.localStorage["sl.UserName"];


        }
    ]);

});