'use strict';

angular.module('fullStackTemplate')
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('splash', {
    url             :    '/',
    templateUrl     :    'html/splash.html',
    controller      :    'splashController'
  })
  .state('home', {
    url             :    '/home',
    templateUrl     :    'html/home.html',
    controller      :    'homeController'
  })
  .state('profile', {
    url             :     '/profile',
    templateUrl     :     'html/profile.html',
    controller      :     'profileController',
    resolve         :     {
      dbProfile   :     function(Auth, $q, $state){
        return Auth.getProfile()
        .catch(()=>{
          $state.go('login');
          return $q.reject();
        });
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
