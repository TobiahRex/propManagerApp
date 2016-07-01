'use strict';

angular.module('fullStackTemplate')
.controller('tenantsController', function($scope, $state, Tenant, $uibModal, $log){
  console.log('tenantCtrl');
  let Tenants = [];

  let getTenant = () => {
    Tenant.getAll()
    .then(res=> {
      Tenants = res.data;
      $scope.tenants = Tenants
    })
    .catch(()=> console.log('you suck try again'));
  };
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
  // Add Modal
  $scope.add = () => {
    var modalInstance = $uibModal.open({
      keyboard: true,
      animation: true,
      templateUrl: '/uib/template/modal/add-tenant-modal.html',
      controller: 'addTenantModalController',
      size: 'lg',
    });

    modalInstance.result.then(function (tenant) {
      console.log('tenant: ', tenant);
    }, function (something) {
      console.log('something: ', something);
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// Edit Modal
  $scope.edit = tenant => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/edit-tenant-modal.html',
      controller: 'editTenantModalController',
      size: 'lg',
      resolve : { editTenant : ()=> tenant }
    });
    modalInstance.result.then(function (editedTenant) {
      console.log('editedTenant: ', editedTenant);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    ////////////////////////////////////////////////////////////////////////
    /// Delete Modal
  $scope.deleteTenant = tenant => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/delete-tenant-modal.html',
      controller: 'deleteTenantModalController',
      size: 'lg',
      resolve : { deleteTenant : ()=> tenant }
    });
    modalInstance.result.then(function (deleteTenant) {
      console.log('deleteTenant: ', deleteTenant);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
