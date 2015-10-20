define(['app'], function(App){

    /**
     * SidenavCtrl Controller
     * @dependency $window
     * @dependency $http
     * @constant   CONST_ENDPOINT

     */

    App.controller('SidenavCtrl', ['$scope', '$window', 'CONST_ENDPOINT', '$http',
        function($scope, $window, CONST_ENDPOINT, $http) {
            /**
             * Init local scope
             */
            $scope.LOADING = false;

            /**
             * Run Immediately
             */

        }
    ]);

});