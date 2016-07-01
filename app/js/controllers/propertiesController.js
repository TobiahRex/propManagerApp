'use strict';

angular.module('fullStackTemplate')
.controller('propertiesController', function($scope, $state, Property){
  console.log('propertyCtrl');

  let Properties = [];

  console.log('Property: ', Property);

  let getProperties = () => {
    Property.getAll()
    .then(res=> {
      console.log(res.data);
      Properties = res.data;
      $scope.properties = Properties
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
