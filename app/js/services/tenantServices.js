'use strict';

angular.module('fullStackTemplate')
.service('Tenant', function($http){

  this.moveIn     =   moveInObj   =>  $http.post      ('/api/tenants/move', moveInObj);

  this.moveOut    =   moveOutObj  =>  $http.put       ('/api/tenants/move', moveInObj);

  this.reset      =   ()          =>  $http.delete    ('/api/tenants/reset');

  this.getAll     =   ()          =>  $http.get       ('/api/tenants/details');
  this.addOne     = newTenant     =>  $http.post      ('/api/tenants/', newTenant);
  this.dumpAll    =   ()          =>  $http.delete    ('/api/tenants/');

  this.getOne     =   id          =>  $http.get       (`/api/tenants/${id}`);
  this.deleteOne  =   id          =>  $http.delete    (`/api/tenants/${id}`);
  this.editOne    =   id          =>  $http.put       (`/api/tenants/${id}`);
});
