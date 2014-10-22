/**
 * Created by stevenchapman on 02/07/2014.
 */
angular.module('ListingController',['assetsService','configService'], function(){}).
    controller('ListingController', ['$scope','assetsService', 'configService', function($scope, assetsService, configService) {
        $scope.products={};
        $scope.myModel={};
        $scope.formObj={};
        $scope.newItems={};
        $scope.formObj.fields={};


        $scope.loadConfig=function(){
            configService.list(
                function (data) {
                    $scope.formObj=data[0];
                }, function () {
                    console.log('FAILURE');
                }
            );

        }

        $scope.items=assetsService.get();
        $scope.loadConfig();

        $scope.addItem = function() {
            console.log($scope.formObj);
            var item=($scope.newItems)
            assetsService.add(item, function(data) {
                item._id = data._id;
                $scope.items.push(item);
                $scope.newItems = {};
            });
        };

    }])
    .directive('newItemInput', function () {
        return {
            restrict: "E",
            scope: {
                configItems: '=',
                newItems: '='
            },
            template: "<div ng-repeat='field in configItems' ng-show='field.display' class='form-group'><br />" +
                "<ng-switch on='field.type'>" +
                "<span ng-switch-when='text'><label for='{{field.title}}'>{{$index+1}} {{field.type}}</label><input type='text' ng-model='newItems[$index+1]' class='form-control'/></span>" +
                "<span ng-switch-when='select'><label for='{{field.title}}'>{{$index+1}} {{field.type}}</label><select ng-model='newItems[$index+1]' ng-options='c.label for c in field.vals'><option value=''>Select</option></select></span>" +
                "<span ng-switch-when='radio'><label for='{{field.title}}'>{{$index+1}} {{field.type}}</label><label data-ng-repeat='v in field.vals'><input ng-model='newItems[$parent.$index+1]' name='{{v.label}}' type='radio'value='{{v.val}}' />{{v.label}}</label></span>" +
                "</ng-switch></div>"
        }
    })