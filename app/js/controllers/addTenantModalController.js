'use strict';

angular.module('fullStackTemplate')
.controller('addTenantModalController', function ($scope, $uibModalInstance, Tenant) {
  console.log('addTenantModalCtrl');

  $scope.createTenant = () => {
    console.log('$scope.tenant: ', $scope.tenant);
    let tenant = $scope.tenant
    $uibModalInstance.close(tenant);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
