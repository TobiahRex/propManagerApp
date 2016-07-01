'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('tenants', {
    url             :    '/',
    templateUrl     :    'html/tenants-main.html',
    controller      :    'tenantsController'
  });
  $urlRouterProvider.otherwise('/');
});
