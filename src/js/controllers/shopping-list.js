define(['../app'], function(App){

    /**
     * Shopping List Controller
     * @dependency $window
     * @dependency $http
     * @constant   CONST_ENDPOINT

     */

    App.controller('ShopListCtrl', ['$scope', '$window',  '$http', '$timeout', 'CONST_ENDPOINT', 'ngToast',
        function($scope, $window, $http, $timeout, CONST_ENDPOINT, ngToast ) {
            /**
             * Init local scope
             */
            $scope.LOADING = true;
            //$scope.currentPage = 1; for pagination purposes
            $scope.submitted = false;
            $scope.shopList = [];

            var defaultProduct = {
                'selected': false,
                'name': '',
                'value': 0.00,
                'editing': true,
                'bought': false,
            };

            $scope.$watch('shopList', function(newValue,oldValue) {
                var tempTotalValue = 0;
                var tempSelected = 0;

                if (newValue != undefined){
                    $scope.totalProducts = newValue.length;

                    for (var i = 0; i < newValue.length; i++){
                        if (newValue[i].bought == false){
                            tempTotalValue += newValue[i].value;

                            if (newValue[i].selected == true){
                                ++tempSelected
                        }
                        }
                    }
                    $scope.totalSelected = tempSelected;
                    $scope.valueProducts = tempTotalValue;

                    if(newValue.length > 0){
                        $window.localStorage['sl.Database'] = JSON.stringify(newValue);
                    }
                }

            },true);



            /**
             * Get Resources
             **/
            $scope.getList = function () {

                $timeout(function(){
                    if ($window.localStorage['sl.Database'] != undefined) {
                        $scope.shopList = JSON.parse($window.localStorage['sl.Database']);
                    };
                    $scope.LOADING = false;
                },1000)


            };

            /**
             * Add Resource
             **/
            $scope.addItem = function () {
                $scope.shopList.push(angular.copy(defaultProduct));
            };

            /**
             * Remove Resource
             * @param item (obj) Resource item to remove
             **/
            $scope.removeItem = function (item) {
                $scope.LOADING = true;
                var index = $scope.shopList.indexOf(item);
                $scope.shopList.splice(index, 1);

                $scope.LOADING = false;
                ngToast.create({
                    className: 'success',
                    content: '<a href="#" class="text-success">Produto removido!</a>'
                });
            };


            /**
             * Show Resource
             * @param item (obj) Resource item to show
             **/
            $scope.showItem = function (item) {
                $scope.currentItem = item;
                $scope.currentItem.perc = Math.round(($scope.currentItem.value *100)/$scope.valueProducts);

                $('#ItemModal').modal('show');
            };


            /**
             * Close Resource
             * @param item (obj) Resource item to close
             **/
            $scope.closeItem = function (item) {
                $scope.currentItem = {};

                $('#ItemModal').modal('hide');
            };

            /**
             * Buy Resource
             * @param item (obj) Resource item to close
             **/
            $scope.buyItem = function (item) {
                $scope.currentItem.bought = true;
                console.log($scope.shopList);

                $('#ItemModal').modal('hide');
            };

            /**
             * Run Immediately
             */
            $scope.getList();
        }
    ]);

});