define([], function() {
    return {
        routes: {
            '/shopping-list': {
                templateUrl: 'views/shopping-list.html',
                controller: 'ShopListCtrl',
                dependencies: [
                    'controllers/shopping-list'
                ]
            },
            '/bought-list': {
                templateUrl: 'views/bought-list.html',
                controller: 'BoughtListCtrl',
                dependencies: [
                    'controllers/bought-list'
                ]
            }
        }
    };
});
