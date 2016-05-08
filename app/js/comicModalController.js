/**
 * Controller for comic details modal
 */
angular.module('app.comicModal', [])
  .controller('ModalInstanceController', function ($scope, $uibModalInstance, comic) {

   $scope.comic = comic;

    $scope.close = function () {
      $uibModalInstance.dismiss();
    };

  });