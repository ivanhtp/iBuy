/*! PontoEletronico - 0.0.1 - 2015-10-20 */
define([],function(){"use strict";var Login=angular.module("Login",["ngMessages"]);Login.constant("CONST_ENDPOINT","/1.0/api/");Login.controller("LoginCtrl",["$scope","$window","$http","$location","$log","$animate","CONST_ENDPOINT",function($scope,$window,$http,$location,$log,$animate,CONST_ENDPOINT){$scope.requestLogin=function(){$scope.formErrors=[];if($scope.loginForm.$valid){$scope.LOADING=true;var basicAuth=$window.btoa($scope.LOGIN+":"+$scope.PASSWORD);$log.info("LoginCtrl.requestLogin => basicAuth: "+basicAuth);$scope.handleLoginSuccess()}else{$scope.LOADING=false;$scope.formErrors.push("Há erros no preenchimento do formulário...")}};$scope.handleLoginSuccess=function(data){if(!data){data=="Login fake"}$log.debug("Login.handleLoginSuccess | Data: "+data);$window.localStorage["sl.UserName"]="User";$scope.redirectToApp()};$scope.handleLoginError=function(data,status){$log.debug("Login.handleLoginError | Status: "+status);$scope.LOADING=false;$scope.formErrors.push(status+": "+data)};$scope.redirectToApp=function(){$log.debug("Login.redirectToApp ");$window.location="/app.html"};if($location.search().expired){$scope.toastSessionExpired()}}]);Login.directive("dtFocusme",function(){return{restrict:"A",link:function(scope,element){element.focus()}}});Login.config(["$logProvider","$locationProvider",function($logProvider,$locationProvider){$logProvider.debugEnabled(false)}]);return Login});