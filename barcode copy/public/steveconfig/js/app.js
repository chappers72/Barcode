'use strict';

angular.module('demo', ['ngResource', 'ngAnimate','ui.bootstrap','ngGrid'])


  .factory('ItemsDB', function($resource) {
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
    .factory('ConfigDB', function($resource) {
        return $resource('/config',
            {id: '@id'}, {
                get: {method: 'GET', isArray: true },
                add: {method: 'POST'},
                delete: {method: 'DELETE'}
            }
        )
    })

 /* .factory('Window', function() {
    var gui = require('nw.gui');
    return gui.Window.get()
  })*/

.factory('ConfigService',function($resource){
        return $resource('http://shinyproducts.co.uk:3000/config/:collectionController:id/:documentController',{
                id:"@id",
                collectionController:'@collectionController', //Use if you want an action to happen against a complete collection
                documentController:'@documentController' //Use if you want an action to happen against a specific product
            },

        {
            update:{
                method:"PATCH"
            }
        ,
                printBarcode:{
                    method:"POST",
                    params:{
                        documentController:"barcode-print"
                    }
                },
                list:{
                    isArray:true,
                    method:'GET'

                }
            }
        )
    }
)


  /*.controller('WindowToolbar', ['$scope', 'Window', function($scope, Window) {
    $scope.windowMinimize = function() {
      Window.minimize();
    };

    $scope.windowToggleFullscreen = function() {
      Window.toggleFullscreen();
    };

    $scope.windowClose = function() {
      Window.close();
    };
  }])*/
  .controller('Listing', ['$scope', 'ItemsDB','ConfigDB','$q','ConfigService', function($scope, ItemsDB, ConfigDB, $q,ConfigService) {
        $scope.title="Demo Mode";
        $scope.products={};
        $scope.myModel={};
        $scope.formObj={};
        $scope.formObj.fields={};
        var i;
        for(i=0;i<10;i++){
            var tmp={title:'',description:'',fieldType:'',display:''}
            $scope.formObj.fields[i]=tmp;
                    }



        $scope.loadConfig=function(){
            ConfigService.list(
                function (data) {
                    $scope.formObj=data[0];
                 }, function () {
                    console.log('FAILURE');
                }
            );

        }

        $scope.submitConfig=function(){
            ConfigService.save($scope.formObj)
        }

        $scope.deleteConfig=function(){
            ConfigService.delete()
        }
        $scope.loadConfig();


        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };
        $scope.setPagingData = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                        $scope.items=ItemsDB.get()
                        $scope.setPagingData($scope.items,page,pageSize);

            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'items',
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,

                columnDefs: [
                    {field: 'name', displayName: 'Product'},
                    {field: 'productcode', displayName: 'Product Code'},
                    {field: 'quantity', displayName: 'Quantity'},
                    {field:'productcode', displayName:'Edit', cellTemplate: '<div style="text-align:center;"><span class="glyphicon glyphicon-pencil"></span></div>', width: 60},
                    {field:'productcode', displayName:'Remove', cellTemplate: '<div style="text-align:center;"><span class="glyphicon glyphicon-minus-sign"></span></div>', width: 60}]
        };



    $scope.addItem = function() {
      var item = {
        name: $scope.newItem.title,
        description: $scope.newItem.description,
        productcode: $scope.newItem.productcode,
        price: $scope.newItem.price,
        quantity: $scope.newItem.quantity
      };
      ItemsDB.add(item, function(data) {
        item._id = data._id;
        $scope.items.push(item);
        $scope.newItem = {
          name: null,
          description: null,
            productcode: null,
            price: null,
            quantity: null
        }
      });
    };

    $scope.removeItem = function (item) {
      ItemsDB.delete({id:item._id}, function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
      })
    };


        $scope.newItem={};

    $scope.updateNewItem = function updateNewItem(fieldName){
        console.log(fieldName);
        console.log($scope.updateNewItem);

    }


  }])
.directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '='
        },
        template: "<div ng-repeat='field in collection' ng-show='field.display' class='form-group'><label for='{{field.title}}'>{{$index+1}} {{field.title}}</label><input type='text' class='form-control'  placeholder='{{field.description}}' /></div>"
    }
})
.directive('myChange', function() {
    return function(scope, element) {
        element.bind('change', function() {
            alert('change on ' + element);
        });
    };
})

.controller('Config', ['$scope','ConfigDB','ConfigService', function($scope,  ConfigDB, ConfigService) {
        $scope.configItems={};
        $scope.configItem={};
        $scope.configItem.title="";
        $scope.configItem.descrption="";
        $scope.configItem.type="text";
        $scope.configItem.display=true;
        $scope.configItem.vals=new Array();

        $scope.configItem.tmpVals={};

        $scope.loadConfig=function(){
            ConfigService.list(
                function (data) {
                    $scope.formObj=data[0];
                    if($scope.formObj) {
                          angular.forEach($scope.formObj.fields, function (value, key) {
                            $scope.configLen = parseInt(key) + 1;

                        });
                        $scope.formObj.isEmpty=false;
                    }else{
                        $scope.configLen=0;
                        $scope.formObj={};
                        $scope.formObj.isEmpty=true;
                        $scope.formObj.fields={};
                    };

                }, function () {
                    console.log('FAILURE');
                }
            );
        }

        $scope.submitConfig=function(){
            console.log($scope.formObj);
            ConfigService.update($scope.formObj)
        }

        $scope.addConfigItem = function() {
            console.log('adding config item');
            angular.forEach($scope.formObj.fields, function (value, key) {
                $scope.configLen = parseInt(key) + 1;
            });
            $scope.formObj.fields[$scope.configLen]=$scope.configItem;
            $scope.configItem={};
            $scope.configItem.type="text";
            $scope.configItem.display=true;
        };

        $scope.deleteConfig=function(){
            ConfigService.delete()
        }


        $scope.loadConfig();

        $scope.submitConfig = function(){
              ConfigService.save($scope.formObj)
        }

        $scope.removeConfigItem = function($index){
            delete $scope.formObj.fields[$index];
        }

        $scope.addConfigItemVals = function() {
            console.log($scope.configItem.vals)
            $scope.configItem.vals.push($scope.configItem.tmpVals);
            $scope.configItem.tmpVals={};
        };
        $scope.removeConfigItemVals = function($index) {
             console.log($scope.configItem.vals)
                $scope.configItem.vals.splice($index, 1);
            console.log($scope.configItem.vals);
        };

        $scope.removeConfigItem = function (item) {
           console.log('removing config item');
        };


}])
