'use strict';

angular.module('fullStackTemplate')
.controller('editTenantModalController', function ($scope, $uibModalInstance, Tenant, thisTenant) {
  console.log('editTenantModalCtrl');

  console.log('editTenant: ', thisTenant );
  $scope.tenant.firstname = thisTenant.tenant.Name.first;

  $scope.createTenant = () => {
    console.log('$scope.tenant: ', $scope.tenant);
    let tenant = $scope.tenant
    $uibModalInstance.close(tenant);
  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss();
  };
});
