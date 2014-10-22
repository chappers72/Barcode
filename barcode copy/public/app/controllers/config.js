/**
 * Created by Mark on 28/05/2014.
 */
angular.module('ConfigController', ['configService','filtersModule'], function(){}).
    controller('ConfigController', ['$scope','configService', '$timeout','filtersModule', function($scope,  configService, $timeout, filtersModule) {
    $scope.configItems={};
    $scope.configItem={};
    $scope.configItem.title="";
    $scope.configItem.descrption="";
    $scope.configItem.type="text";
    $scope.configItem.display=true;
    $scope.configItem.vals=new Array();
    $scope.configItem.tmpVals={};
    $scope.showError = false;
    $scope.doFade = false;

    $scope.loadConfig=function(){
        configService.list(
            function (data) {
                $scope.formObj=data[0];
                if(!data[0]){
                    $scope.configLen=0;
                    $scope.configTmpLen=0;
                    $scope.formObj={};
                    $scope.formObj.isEmpty=true;
                    $scope.formObj.fields={};
                }else if($scope.formObj.hasOwnProperty('fields')) {
                    angular.forEach($scope.formObj.fields, function (value, key) {
                        $scope.configLen = parseInt(key) + 1;

                    });
                    $scope.formObj.isEmpty=false;
                }else{
                    $scope.configLen=0;
                    $scope.configTmpLen=0;
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
        if($scope.formObj.isEmpty==true){
            configService.save($scope.formObj)
        }else {
            $scope.formObj.isEmpty=false
            configService.update($scope.formObj)
        }
    }

    $scope.addConfigItem = function() {
        console.log('adding config item');
        angular.forEach($scope.formObj.fields, function (value, key) {
            $scope.configLen = parseInt(key) + 1;
        });
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();
        $scope.configItem.id=uniqid;
        $scope.formObj.fields[$scope.configLen]=$scope.configItem;
        $scope.configItem={};
        $scope.configItem.type="text";
        $scope.configItem.display=true;
    };

    $scope.deleteConfig=function(){
        configService.delete()
    }


    $scope.loadConfig();


    $scope.addConfigItemVals = function() {
        //Test if configItem.vals is empty
        if(angular.isUndefined($scope.configItem.vals)){
            $scope.configItem.vals=[];
        }
        $scope.configItem.vals.push($scope.configItem.tmpVals);
        $scope.configItem.tmpVals={};
    };
    $scope.removeConfigItemVals = function($index) {
       $scope.configItem.vals.splice($index,1);
    };

    $scope.removeConfigItem = function (item) {
        console.log('removing config item');
        item.deleted=true;
    };

}]);