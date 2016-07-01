'use strict';

angular.module('fullStackTemplate')
.controller('propertiesController', function($scope, $state, $uibModal,  $log, Property){
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

  //////////////////////////////////////////////////////////////////////
  // Add Modal
  $scope.addProperty = () => {
    var modalInstance = $uibModal.open({
      keyboard: true,
      animation: true,
      templateUrl: '/uib/template/modal/add-property-modal.html',
      controller: 'addPropertyModalController',
      size: 'lg',
    });

    modalInstance.result.then(function (property) {
      console.log('property: ', property);
    }, function (something) {
      console.log('something: ', something);
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// Edit Modal
  $scope.editProperty = property => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/edit-property-modal.html',
      controller: 'editPropertyModalController',
      size: 'lg',
      resolve : { editProperty : ()=> property }
    });
    modalInstance.result.then(function (editedProperty) {
      console.log('editedProperty: ', editedProperty);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// Delete Modal
  $scope.deleteProperty = property => {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/uib/template/modal/delete-property-modal.html',
      controller: 'deletePropertyModalController',
      size: 'lg',
      resolve : { deleteProperty : ()=> property }
    });
    modalInstance.result.then(function (deleteProperty) {
      console.log('deleteProperty: ', deleteProperty);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
