/*! PontoEletronico - 0.0.1 - 2015-10-20 */
define(["routes/routes","routes/resolver"],function(config,resolver){"use strict";var App=angular.module("App",["ngRoute","ngAnimate","ngMessages","ngToast","ui.bootstrap"]);App.constant("CONST_ENDPOINT","/1.0/api/");App.config(["$logProvider","$routeProvider","$locationProvider","$controllerProvider","$compileProvider","$filterProvider","$httpProvider","$provide","ngToastProvider",function($logProvider,$routeProvider,$locationProvider,$controllerProvider,$compileProvider,$filterProvider,$httpProvider,$provide,ngToastProvider){App.controller=$controllerProvider.register;App.directive=$compileProvider.directive;App.filter=$filterProvider.register;App.factory=$provide.factory;App.service=$provide.service;$logProvider.debugEnabled(false);if(config.routes!==undefined){angular.forEach(config.routes,function(route,path){$routeProvider.when(path,{templateUrl:route.templateUrl,controller:route.controller,resolve:resolver(route.dependencies)})})}$routeProvider.otherwise({redirectTo:"/shopping-list"});$locationProvider.html5Mode(false).hashPrefix("!");ngToastProvider.configure({animation:"slide",verticalPosition:"bottom"});$httpProvider.defaults.headers.common["Authorization"]=window.localStorage["pt.Token"],$httpProvider.defaults.headers.common["Accept-Language"]="pt-BR";$httpProvider.interceptors.push(["$q","$location","$window","authApp",function($q,$location,$window,authApp){return{request:function(config){if(window.localStorage["pt.Token"]){}return config},response:function(response){return response},responseError:function(response){if(response.status===403){authApp.clearSession()}return $q.reject(response)}}}])}]);App.run(["$http",function($http){window.scrollTo(0,1);$(document).ready(function(){$('[data-toggle="offcanvas"]').click(function(){$(".row-offcanvas").toggleClass("active")})})}]);return App});