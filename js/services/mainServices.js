'use strict';

baseServices .factory('Icons', ['$http', '$q', '$filter', '$timeout',
  function($http, $q, $filter, $timeout){

    function getAll(){

        var defer = $q.defer();

        $http.get('/data/icons.json')
            .success(function(advertisers) {
                defer.resolve(advertisers);
            });


        return defer.promise;
    }

    function get(advetiserId) {
        var defer = $q.defer();

        $http.get('/advertiser/' + advetiserId)
            .success(function(data) {
                defer.resolve(data);
            })

        return defer.promise;

    }

    function save(data) {
        var defer = $q.defer();

        $http.post('/advertiser', data)
            .success(function(response) {
                defer.resolve(response);
            })

        return defer.promise;
    }


    return {
        getAll: getAll,
        get: get,
        save: save
    }

  }]);

baseServices .factory('Categorias', ['$http', '$q', '$filter', '$timeout',
  function($http, $q, $filter, $timeout){

    function getAll(){

        var defer = $q.defer();

        $http.get('/data/categorias.json')
            .success(function(advertisers) {
                defer.resolve(advertisers);
            });


        return defer.promise;
    }


    return {
        getAll: getAll
    }

  }]);