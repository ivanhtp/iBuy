define(['../app'], function(App){

    /**
     * BoughtList Controller
     * @dependency $window
     * @dependency $http
     * @constant   CONST_ENDPOINT

     */

    App.controller('BoughtListCtrl', ['$scope', '$window',  '$http', '$timeout', 'CONST_ENDPOINT', 'ngToast',
        function($scope, $window, $http, $timeout, CONST_ENDPOINT, ngToast ) {
            /**
             * Init local scope
             */
            $scope.LOADING = true;
            //$scope.currentPage = 1; for pagination purposes
            $scope.submitted = false;
            $scope.boughtList = [];

            var defaultProduct = {
                'selected': false,
                'name': '',
                'value': 0.00,
                'editing': true,
                'bought': false,
            };



            /**
             * Get Resources
             **/
            $scope.getList = function () {

                $timeout(function(){
                    if ($window.localStorage['sl.Database'] != undefined) {
                        $scope.boughtList = JSON.parse($window.localStorage['sl.Database']);
                    };
                    $scope.LOADING = false;
                },1000)


            };


            /**
             * Buy Resource
             * @param item (obj) Resource item to close
             **/
            $scope.unbuyItem = function (item) {
                item.bought = false;

                $window.localStorage['sl.Database'] = JSON.stringify($scope.boughtList);

                $('#ItemModal').modal('hide');
            };

            /**
             * Run Immediately
             */
            $scope.getList();
        }
    ]);

});