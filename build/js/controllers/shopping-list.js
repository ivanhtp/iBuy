/*! PontoEletronico - 0.0.1 - 2015-10-20 */
define(["../app"],function(App){App.controller("ShopListCtrl",["$scope","$window","$http","$timeout","CONST_ENDPOINT","ngToast",function($scope,$window,$http,$timeout,CONST_ENDPOINT,ngToast){$scope.LOADING=true;$scope.submitted=false;$scope.shopList=[];var defaultProduct={selected:false,name:"",value:0,editing:true,bought:false};$scope.$watch("shopList",function(newValue,oldValue){var tempTotalValue=0;var tempSelected=0;if(newValue!=undefined){$scope.totalProducts=newValue.length;for(var i=0;i<newValue.length;i++){if(newValue[i].bought==false){tempTotalValue+=newValue[i].value;if(newValue[i].selected==true){++tempSelected}}}$scope.totalSelected=tempSelected;$scope.valueProducts=tempTotalValue;if(newValue.length>0){$window.localStorage["sl.Database"]=JSON.stringify(newValue)}}},true);$scope.getList=function(){$timeout(function(){if($window.localStorage["sl.Database"]!=undefined){$scope.shopList=JSON.parse($window.localStorage["sl.Database"])}$scope.LOADING=false},1e3)};$scope.addItem=function(){$scope.shopList.push(angular.copy(defaultProduct))};$scope.removeItem=function(item){$scope.LOADING=true;var index=$scope.shopList.indexOf(item);$scope.shopList.splice(index,1);$scope.LOADING=false;ngToast.create({className:"success",content:'<a href="#" class="text-success">Produto removido!</a>'})};$scope.showItem=function(item){$scope.currentItem=item;$scope.currentItem.perc=Math.round($scope.currentItem.value*100/$scope.valueProducts);$("#ItemModal").modal("show")};$scope.closeItem=function(item){$scope.currentItem={};$("#ItemModal").modal("hide")};$scope.buyItem=function(item){$scope.currentItem.bought=true;console.log($scope.shopList);$("#ItemModal").modal("hide")};$scope.getList()}])});