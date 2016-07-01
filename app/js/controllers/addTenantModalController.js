'use strict';

angular.module('fullStackTemplate')
.controller('addTenantModalController', function ($scope, $uibModalInstance, Tenant) {
  console.log('addTenantModalCtrl');
  console.log($scope.tenant);

  $scope.createTenant = tenant => {
    console.log('click');
    console.log('tenant from Click: ', tenant);
    $uibModalInstance.close($scope.tenant);

    console.log('tenant: ', $scope.tenant);

  };

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };
});
