/**
 * Created by Mark on 20/05/2014.
 */

barcode=angular.module('barcode',['ui.router','ui-configuration','ui-assets','ConfigController','ListingController']);

barcode.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app',
            {
            url: '/',
            views: {
                'header': { templateUrl: 'app/ui-common/header.tpl.html' },
                'sidebar': { templateUrl: 'app/ui-common/sidebar.home.tpl.html' },
                'main':{templateUrl: 'app/ui-common/main.home.tpl.html'}
            }
        })
        $urlRouterProvider.otherwise('/');
    }
]);

