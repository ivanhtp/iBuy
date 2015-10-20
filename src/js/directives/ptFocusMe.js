define(['app'], function(App){

    /**
     * Focus element input just after loading DOM
     *
     * Usage: <input type="text" showFocus="condition" >
     **/

    App.directive('showFocus', function($timeout) {
        return function(scope, element, attrs) {
            scope.$watch(attrs.showFocus,
                function (newValue) {
                    $timeout(function() {
                        newValue && element.focus();
                    });
                },true);
        };
    });
});