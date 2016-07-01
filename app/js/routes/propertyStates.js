'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('properties', {
    url             :    '/property',
    templateUrl     :    'html/properties-main.html',
    controller      :    'propertiesController'
  })
  .state('properties.add', {
    url             :   '/property/add',
    temlateUrl      :   'html/add-property.html',
    controller      :   'propertiesController'
  })
  $urlRouterProvider.otherwise('/');
});
