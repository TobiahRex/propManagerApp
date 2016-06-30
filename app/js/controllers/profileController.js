'use strict';

angular.module('fullStackTemplate')
.controller('profileController', function($state, $scope, Auth, dbProfile, Profile){
  console.log('profileCtrl');

  let profileObj = dbProfile;  // entire profile
  $scope.profile = profileObj.data;

  $scope.newItems = () => $scope.$broadcast('getNewItems'); // listener @ newItemController
});
