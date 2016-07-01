'use strict';

angular.module('fullStackTemplate')
.service('Auth', function($http){

  this.loginUser = userObj => $http.post('/api/users/login', userObj);

  this.logoutUser = _ => $http.delete('/api/users/login');

  this.registerUser = userObj => $http.post('/api/users/register', userObj);

  this.getProfile = _ => $http.get('/api/users/profile');

})
.service('Tenant', function($http){

  this.moveIn   =   moveInObj   =>  $http.post('/api/tenants/move', moveInObj);

  this.moveOut  =   moveOutObj  =>  $http.put('/api/tenants/move', moveInObj);


  this.reset    =   ()          =>  $http.delete('/reset');

  this.getAll   =   ()          =>  $http.get('/');
  this.getAll   =   ()          =>  $http.get('/');


  .get((req, res)     => Tenant.find({}, res.handle))
  .post((req, res)    =>
  {
    console.log('req.body: ', req.body);
    Tenant.create(req.body, res.handle)
  })
  .delete((req, res)  => Tenant.remove({}, res.handle));

  this.route('/:id')
  .get((req, res)     => Tenant.findById(req.params.id, res.handle))
  .delete((req, res)  => Tenant.findByIdAndRemove(req.params.id, res.handle))
  .put((req, res)     => Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));

  module.exports = router;


})
