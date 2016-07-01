'use strict';

angular.module('fullStackTemplate')
.controller('clientsController', function($scope, $state, Client){
  console.log('clientCtrl');

  let Clients = [];

  console.log('Client: ', Client);

  let getClients = () => {
    Client.getAll()
    .then(res=> {
      console.log(res.data);
      Clients = res.data;
      $scope.clients = Clients
    })
    .catch(()=> $scope.clients);
  }

  getClients();

  $scope.delete = (index) => {

    Client.deleteOne(id)
    .then(res=>{
      Clients = res.data;
      $scope.clients = Clients;
    })
    .catch(()=> {
      $scope.clients = 'you suck, try again.';
    });
  };


});
