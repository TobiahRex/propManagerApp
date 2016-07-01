'use strict';

angular.module('fullStackTemplate')
.controller('editTenantModalController', function ($scope, $uibModalInstance, Tenant, editTenant) {
  console.log('editTenantModalCtrl');

  console.log('editTenant: ', editTenant.tenant );

  $scope.tenant = editTenant.tenant;

  console.log('$scope.tenant: ', $scope.tenant);

  $scope.createTenant = () => {
    console.log('$scope.tenant: ', $scope.tenant);
    let tenant = $scope.tenant
    $uibModalInstance.close(tenant);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
