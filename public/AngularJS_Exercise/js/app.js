 var myApp = angular.module("myApp", [ "ngRoute"]);
        
        myApp.config(function($routeProvider){
            
            $routeProvider
                .when("/", { templateUrl: 'page/home.html',
                             controller: 'firstController'        
                           } )
                .otherwise({ redirectTo : "/"});
        });
                
        myApp.controller("firstController", function($scope,$http){ 
                      
             $scope.products = [];      
                                            
            function getProducts() {
                $http({                  
                    method: 'GET',
                    url: '/storeItems'
                })
                .success(function (response) {      
                    $scope.products = response;           
                });
            }
            
            getProducts();
                   
            // Adding a new product 
            $scope.addProduct = function () {
                $http({
                    method: 'POST',
                    url: '/storeItems',
                    data : {
                        addItem : $scope.newItemName,
                        description : $scope.newItemDescription,
                        priceItem : $scope.newItemPrice
                    }
                })
                .success(function (data) {          
                    console.log(data);
                    $scope.products.push(data); 
                    
                    $('input[id=addItem]').val("");
                    $('input[id=descriptionItem]').val("");
                    $('input[id=priceItem]').val("");
                });
                
            };
                 
            // Delete The Data 
            $scope.deleteMe = function(pId){ 
                $http({
                    method: 'DELETE',
                    url: '/storeItems/' + pId
                })
                .success(function (data) { 
                     deleteItem($scope.products,'id', pId);
                });    
            };
            
            function deleteItem(ary, prop, val) {
            
                for( var i=0; i<ary.length; i++){  
                    if(ary[i][prop] == val) {
                        ary.splice(i, 1);           
                    }
                }
            }
                
        });        
        