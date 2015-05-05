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


baseServices.factory('Media',['mediaLoader','shuffleArray',
    function(mediaLoader,shuffleArray){
        var sounds = {},
            current_sound = 0,
            correct_sound = "sounds/correct.mp3",
            wrong_sound = "sounds/wrong.mp3";


        function setMedias(data){
            var shuffled = shuffleArray.shuffle(data);
              sounds = shuffled;
              resetMedias();
        }

        function resetMedias (){
            current_sound = 0;
        }

        function play(){
            var file = sounds[current_sound].url;
                mediaLoader.load(file);
        }

        function checkCorrect(id){
            if(sounds[current_sound].id_par == id){
                if(current_sound < sounds.length){
                    current_sound ++;
                }
                mediaLoader.load(correct_sound);
                return true;
            }else{
                mediaLoader.load(wrong_sound);
                return false;
            }
        }

        return {
            setMedias:setMedias,
            play : play,
            checkCorrect: checkCorrect
            }
    }
]);

baseServices.factory('mediaLoader', ['$q',
    function($q){

        //ARREGLAR PARA TABLET Y QUE FRENE SONIDO
        //var Media = new Media();
        function load(src){
            var src;
            if(ionic.Platform.isAndroid()){
                src = '/android_asset/www/' + src;

            }else{
                new Audio(src).play();
            }
        }

        return {
            load:load
            };
}]);

baseServices.factory('shuffleArray', [

    function(){

        function shuffle(array) {
          var m = array.length, t, i;
          // While there remain elements to shuffle
          while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
          }

          return array;
        }

        return {
            shuffle:shuffle
            };
}])