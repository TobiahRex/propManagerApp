'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('clients', {
    url             :    '/clients',
    templateUrl     :    'html/clients-main.html',
    controller      :    'clientsController'
  });
  $urlRouterProvider.otherwise('/');
});
