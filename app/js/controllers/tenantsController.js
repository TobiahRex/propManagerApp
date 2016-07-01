'use strict';

angular.module('fullStackTemplate')
.controller('tenantsController', function($scope, $state, Tenant, $uibModal, $log){
  console.log('tenantCtrl');

  let Tenants = [];
  console.log('Tenant: ', Tenant);

  let getTenant = () => {
    Tenant.getAll()
    .then(res=> {
      console.log(res.data);
      Tenants = res.data;
      $scope.tenants = Tenants
    })
    .catch(()=> console.log('you suck try again'));
  }

  getTenant();

  $scope.delete = (index) => {

    Tenant.deleteOne(id)
    .then(res=>{
      Tenants = res.data;
      $scope.tenants = Tenants;
    })
    .catch(()=> console.log('you suck try again'));
  };

  //////////////////////////////////////////////////////////////////////
  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.add = () => {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/add-modal.html',
      controller: 'addTenantModalController',
      size: 'lg',
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
