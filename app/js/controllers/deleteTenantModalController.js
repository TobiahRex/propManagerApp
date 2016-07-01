'use strict';

angular.module('fullStackTemplate')
.controller('deleteTenantModalController', function ($scope, $uibModalInstance, Tenant, deleteTenant) {
  console.log('deleteTenantModalCtrl');
  $scope.tenant = deleteTenant.tenant;
  // console.log('$scope.tenant: ', $scope.tenant);
  $scope.deleteTenant = () => {
    let deleteTenant = $scope.tenant
    $uibModalInstance.close(deleteTenant);
  };
  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
