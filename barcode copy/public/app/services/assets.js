/**
 * Created by Mark on 28/05/2014.
 */
var module=angular.module('assetsService',['ngResource']);
module.factory('assetsService', function($resource) {
        return $resource('/assets/:id',
            {id: '@id'}, {
                get: {method: 'GET', isArray: true },
                add: {method: 'POST'},
                delete: {method: 'DELETE'}
            }
        );
        return $resource('/assets/:productcode',
            {productcode: 'productcode'}, {
                get: {method: 'GET', isArray: true },
                add: {method: 'POST'},
                delete: {method: 'DELETE'}
            }
        );
    })
module.factory('ItemsDB', function($resource) {
    return $resource('/items/:id',
        {id: '@id'}, {
            get: {method: 'GET', isArray: true },
            add: {method: 'POST'},
            delete: {method: 'DELETE'}
        }
    );
    return $resource('/items/:productcode',
        {productcode: 'productcode'}, {
            get: {method: 'GET', isArray: true },
            add: {method: 'POST'},
            delete: {method: 'DELETE'}
        }
    );
})
