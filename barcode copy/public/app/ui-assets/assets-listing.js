/**
 * Created by Mark on 28/05/2014.
 */
uiAssets=angular.module('ui-assets',['ui.router']);
uiAssets.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app.ui-assets', {
            url: 'assets',
            views: {
                'sidebar@': { templateUrl: 'app/ui-assets/sidebar.assets.tpl.html' },
                'main@':{templateUrl: 'app/ui-assets/main.assets.tpl.html'}
            },
            controller : 'ListingController'
        });
    }
]);