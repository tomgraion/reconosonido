'use strict';

baseServices .factory('Icons', ['$http', '$q', '$filter', '$timeout','Dificultad',
  function($http, $q, $filter, $timeout , Dificultad){

    function getAll(){

        var defer = $q.defer();

        $http.get('/data/icons.json')
            .success(function(data) {
                defer.resolve(data);
            });

        return defer.promise;
    }

    function getByCategoryDificulty(category){

        var defer = $q.defer(),
            lengthItems = Dificultad.getDificultad().items;

        $http.get('/data/icons.json')
            .success(function(data) {
                var icons = data.filter(function(entry){
                    return entry.id_categoria == category;
                })
                icons = icons.splice(0,lengthItems);
                defer.resolve(icons);
            });

        return defer.promise;
    }

    function get(iconId) {
        var defer = $q.defer();

        $http.get('/advertiser/' + iconId)
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
        save: save,
        getByCategoryDificulty : getByCategoryDificulty
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

baseServices .factory('Dificultad', ['$http', '$q', '$filter', '$timeout',
  function($http, $q, $filter, $timeout){
    var selectedDificultad = {};

    function getAll(){

        var defer = $q.defer();

        $http.get('/data/dificultad.json')
            .success(function(dificultad) {
                defer.resolve(dificultad);
            });

        return defer.promise;
    }

    function setDificultad(dificultad){
        selectedDificultad = dificultad;
    }

    function getDificultad(){
        return selectedDificultad;
    }


    return {
        getAll: getAll,
        setDificultad : setDificultad,
        getDificultad : getDificultad
    }

  }]);

baseServices.factory('loadMedia', ['$q','$ionicPlatform','$window',
    function($q, $ionicPlatform, $window){

        function loadMedia(src, onError, onStatus, onStop){
            var defer = $q.defer();
            $ionicPlatform.ready(function(){
              var mediaSuccess = function(){
                if(onStop){onStop();}
              };
              var mediaError = function(err){
                _logError(src, err);
                if(onError){onError(err);}
              };
              var mediaStatus = function(status){
                if(onStatus){onStatus(status);}
              };

              if($ionicPlatform.is('android')){
                src = '/android_asset/www/' + src;
              }
              defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
            });
            return defer.promise;
          }

        function _logError(src, err){
            console.error('media error', {
              code: err.code,
              message: getErrorMessage(err.code)
            });
          }

        function getStatusMessage(status){
            if(status === 0){return 'Media.MEDIA_NONE';}
            else if(status === 1){return 'Media.MEDIA_STARTING';}
            else if(status === 2){return 'Media.MEDIA_RUNNING';}
            else if(status === 3){return 'Media.MEDIA_PAUSED';}
            else if(status === 4){return 'Media.MEDIA_STOPPED';}
            else {return 'Unknown status <'+status+'>';}
          }

        function getErrorMessage(code){
            if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
            else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
            else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
            else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
            else {return 'Unknown code <'+code+'>';}
          }


        return {
            };
}])