'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('register', {
    url             :    '/register',
    templateUrl     :    'html/sign_in/register.html',
    controller      :    'registerController'
  })
  .state('verify', {
    url             :    '/verify',
    templateUrl     :    'html/sign_in/verify.html'
  })
  .state('verified', {
    url             :    '/verified',
    templateUrl     :    'html/sign_in/verified.html'
  })
  .state('unverified', {
    url             :    '/unverified',
    templateUrl     :    'html/sign_in/unverified.html'
  })
  .state('login', {
    url             :    '/login',
    templateUrl     :    'html/sign_in/login.html',
    controller      :    'loginController'
  })
  .state('logout', {
    url             :    '/logout',
    controller      :    'logoutController'
  })
  .state('forgot', {
    url             :    '/forgot',
    templateUrl     :    'html/sign_in/forgot.html',
    controller      :    'forgotController'
  });
  $urlRouterProvider.otherwise('/');
})
