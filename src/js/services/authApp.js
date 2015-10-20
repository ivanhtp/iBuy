define(['app'], function(App){

    /**
     * AuthAgent Service
     * Hits a void service in the backend just to check if token is valid.
     */
    App.service('authApp', ['$log', '$window', '$location',
        function($log, $window, $location) {

            //AuthADMIN
            var authApp = {};

            /**
             * Checks if current page is on user menu
             */
            authApp.checkAuthentication = function() {
                var currentPage = '#!'+$location.path();
                var accessGranted = false;

                if ($window.localStorage["sl.Menu"]){
                    var menu = JSON.parse($window.localStorage["sl.Menu"]);
                    angular.forEach(menu, function(value, key) {
                        if(value != null){
                            for (i = 0;i < value.length; i++){
                                if (value[i].url == currentPage && !accessGranted) {
                                    accessGranted = true;
                                }
                            }
                        }
                    });
                }


                if (!accessGranted) {
                    authApp.clearSession();
                }

            };

            /**
             * Clear all localStorage Items and redirect to Login
             * @returns void
             */
            authApp.clearSession = function() {
                $log.debug("authApp.clearSession | Cleaning session");
                for (var i = $window.localStorage.length - 1; i >= 0; i--) {
                    var str = $window.localStorage.key(i);
                    if (str !== null) {
                        $window.localStorage.removeItem(str);
                    }
                }

                $log.debug("authApp.clearSession | Redirecting to login");
                $window.location = 'login.html';
            };

            return authApp
        }
    ]);
});
