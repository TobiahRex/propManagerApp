'use strict';

angular.module('fullStackTemplate')
.service('Property', function($http){

  this.getDetails =   ()          =>  $http.get       ('/api/properties/details', moveInObj);

  this.reset      =   ()          =>  $http.delete    ('/api/properties/reset');

  this.getAll     =   ()          =>  $http.get       ('/api/properties/');
  this.addOne     = newTenant     =>  $http.post      ('/api/properties/', newTenant);
  this.dumpAll    =   ()          =>  $http.delete    ('/api/properties/');

  this.getOne     =   id          =>  $http.get       (`/api/properties/${id}`);
  this.deleteOne  =   id          =>  $http.delete    (`/api/properties/${id}`);
  this.editOne    =   id          =>  $http.put       (`/api/properties/${id}`);

});
