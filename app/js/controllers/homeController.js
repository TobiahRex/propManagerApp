'use strict';

angular.module('fullStackTemplate')
.controller('homeController', function($scope, $state, Items, allItems){
  console.log('homeCtrl');

  let allItemsObj = allItems;
  $scope.allItems = allItemsObj.data;

});
