/**
 * Created by Mark on 28/05/2014.
 */
var module=angular.module('configService',['ngResource']);
module.factory('configService',function($resource){
        return $resource('/config/:collectionController:id/:documentController',{
                id:"@id",
                collectionController:'@collectionController', //Use if you want an action to happen against a complete collection
                documentController:'@documentController' //Use if you want an action to happen against a specific product
            },


            {
                update:{
                    method:"POST"
                },
                save:{
                    method:"POST"
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