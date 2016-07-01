'use strict';

angular.module('fullStackTemplate')
.service('Auth', function($http){

  this.loginUser = userObj => $http.post('/api/users/login', userObj);

  this.logoutUser = _ => $http.delete('/api/users/login');

  this.registerUser = userObj => $http.post('/api/users/register', userObj);

  this.getProfile = _ => $http.get('/api/users/profile');

});
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
