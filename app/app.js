angular.module('app', [
  'ngRoute',
  'angular.filter',
  'ui.bootstrap',
  'app.comicsService',
  'app.comicModal',
  'app.comicsController'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/comics'});
}]);
