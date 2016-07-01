'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('clients', {
    url             :    '/',
    templateUrl     :    'html/clients-main.html',
    controller      :    'clientsController'
  });
  $urlRouterProvider.otherwise('/');
});
