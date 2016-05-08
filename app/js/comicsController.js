/**
 * Main comics catalogue controller
 */
angular.module('app.comicsController', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/comics', {
      templateUrl: 'templates/comics.html',
      controller: 'ComicsController'
    });
  }])

  .controller('ComicsController', function ($http, $scope, ComicsService, $uibModal, $sce) {
    $scope.isLoading = true;
    $scope.isError = false;
    $scope.searchText = '';
    
    ComicsService.getComics(onComicsLoaded, onComicsLoadFail);

    function onComicsLoaded(comicsData) {
      $scope.comicList = comicsData.data.results;
      $scope.attributionHTML = $sce.trustAsHtml(comicsData.attributionHTML);
      $scope.isLoading = false;
    }

    function onComicsLoadFail(response) {
      $scope.isLoading = false;
      $scope.isError = true;
      console.error(response.data);
    }
    
    $scope.showMoreBtnClick = function () {
      ComicsService.getComics(onComicsLoaded, onComicsLoadFail);
    };

    /**
     * Opens a modal with the comic's details
     * @param comic to display in modal
     */
    $scope.showComicDetails = function (comic) {

      var modalConfig = {
        animation: true,
        controller: 'ModalInstanceController',
        templateUrl: 'templates/comic_modal.html',
        resolve: {
          comic: function () {
            return comic;
          }
        }
      };
      
      $uibModal.open(modalConfig);
    };
    
  });