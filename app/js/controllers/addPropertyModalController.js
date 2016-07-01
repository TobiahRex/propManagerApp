'use strict';

angular.module('fullStackTemplate')
.controller('addPropertyModalController', function ($scope, $uibModalInstance, Tenant) {
  console.log('addPropertyModalCtrl');

  $scope.createTenant = () => {
    console.log('$scope.tenant: ', $scope.tenant);
    let tenant = $scope.tenant
    $uibModalInstance.close(tenant);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
