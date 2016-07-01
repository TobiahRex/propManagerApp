'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('properties', {
    url             :    '/',
    templateUrl     :    'html/properties-main.html',
    controller      :    'propertiesController'
  });
  $urlRouterProvider.otherwise('/');
});
