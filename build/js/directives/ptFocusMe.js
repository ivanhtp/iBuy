/*! PontoEletronico - 0.0.1 - 2015-10-20 */
define(["app"],function(App){App.directive("showFocus",function($timeout){return function(scope,element,attrs){scope.$watch(attrs.showFocus,function(newValue){$timeout(function(){newValue&&element.focus()})},true)}})});