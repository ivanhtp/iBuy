define(['app'],function(App){

    /**
     *  Truncate large strings
     *
     *  Usage: {{some_text | truncate:true:100:' ...'}}
     *
     *  @option wordwise (boolean) if true, cut only by words bounds
     *  @option max (integer) max length of the text, cut by this number
     *  @option tail (string, default '...') - suffix after the string
     **/
    App.filter('truncate', function() {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
});