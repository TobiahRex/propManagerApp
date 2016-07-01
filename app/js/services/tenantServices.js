'use strict';

angular.module('fullStackTemplate')
.service('Tenant', function($http){

  this.moveIn     =   moveInObj   =>  $http.post('/api/tenants/move', moveInObj);

  this.moveOut    =   moveOutObj  =>  $http.put('/api/tenants/move', moveInObj);

  this.reset      =   ()          =>  $http.delete('/reset');

  this.getAll     =   ()          =>  $http.get('/');
  this.addOne     = newTenant     =>  $http.post('/', newTenant);
  this.dumpAll    =   ()          =>  $http.delete('/');

  this.getOne     =   id          =>  $http.get(`/${id}`);
  this.deleteOne  =   id          =>  $http.delete(`/${id}`);
  this.editOne    =   id          =>  $http.put(`/${id}`);

  module.exports = router;
});
