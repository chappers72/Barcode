/**
 * Created by Mark on 28/05/2014.
 */
uiConfiguration=angular.module('ui-configuration',['ui.router']);

uiConfiguration.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app.ui-configuration', {
            url: 'config',
            views: {
                'sidebar@': { templateUrl: 'app/ui-configuration/sidebar.config.tpl.html' },
                'main@':{templateUrl: 'app/ui-configuration/main.config.tpl.html'}
            }
        });
    }
]);