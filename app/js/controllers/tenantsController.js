'use strict';

angular.module('fullStackTemplate')
.controller('tenantsController', function($scope, $state, Tenant){
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
    .catch(()=> $scope.tenants);
  }

  getTenant();

  $scope.delete = (index) => {

    Tenant.deleteOne(id)
    .then(res=>{
      Tenants = res.data;
      $scope.tenants = Tenants;
    })
    .catch(()=> {
      $scope.tenants = 'you suck, try again.';
    });
  };


});
