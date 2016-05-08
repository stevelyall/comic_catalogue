/**
 * Retrieves comics from the Marvel API.
 */
angular.module('app.comicsService', [])
  .factory('ComicsService', function ($http) {


    var comicsEndpoint = 'http://gateway.marvel.com:80/v1/public/comics';
    var apiKey = '70a4d8609c770d4b7560333082125c8e';
    var limit = 20; // number of records to retrieve
    var offset = 0;

    return {

      /**
       * Makes a request to retrieve a list of comics from the API.
       * Subsequent calls will retrieve a new list of comics.
       * @param onComicsLoaded success callback
       * @param onComicsLoadFail error callback
       */
      getComics: function (onComicsLoaded, onComicsLoadFail) {
        var requestUri = comicsEndpoint + '?limit=' + limit + '&offset=' + offset + '&apikey=' + apiKey;
        $http.get(requestUri)
          .then(function (res) {
            if (res.code >= 400) {
              onComicsLoadFail(res)
            }
            else {
              onComicsLoaded(res.data);
              offset += limit;
            }
          });
      }
    }

  });