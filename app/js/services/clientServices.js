'use strict';

angular.module('fullStackTemplate')
.service('Client', function($http){

  this.buy        =   buyObj   =>  $http.post     ('/api/clients/sale', moveInObj);

  this.sell       =   sellObj  =>  $http.put      ('/api/clients/sale', moveInObj);

  this.reset      =   ()       =>  $http.delete   ('api/clients/reset');

  this.getAll     =   ()       =>  $http.get      ('api/clients/');
  this.addOne     = newTenant  =>  $http.post     ('api/clients/', newTenant);
  this.dumpAll    =   ()       =>  $http.delete   ('api/clients/');

  this.getOne     =   id       =>  $http.get      (`api/clients/${id}`);
  this.deleteOne  =   id       =>  $http.delete   (`api/clients/${id}`);
  this.editOne    =   id       =>  $http.put      (`api/clients/${id}`);

  module.exports = router;
});
