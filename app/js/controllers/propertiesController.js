'use strict';

angular.module('fullStackTemplate')
.controller('propertiesController', function($scope, $state, Property){
  console.log('propertyCtrl');

  let Properties = [];

  let getProperties = () => {
    Property.getAll()
    .then(res=> {
      Properties = res.data;
    })
    .catch(()=> $scope.properties);
  }

  getProperties();

  $scope.delete = (index) => {

    Property.deleteOne(id)
    .then(res=>{
      Properties = res.data;
      $scope.properties = Properties;
    })
    .catch(()=> {
      $scope.properties = 'you suck, try again.';
    });
  };


});
