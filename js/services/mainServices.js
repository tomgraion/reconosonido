'use strict';

baseServices .factory('Icons', ['$http', '$q', '$filter', '$timeout','Dificultad','ProperURL',
  function($http, $q, $filter, $timeout , Dificultad, ProperURL ){

    function getAll(){

        var defer = $q.defer(),
          url = ProperURL.returnURL('data/icons.json');

        $http.get(url)
            .success(function(data) {
              defer.resolve(data);
            })
            .error(function(){
              alert(data);
            });

        return defer.promise;

    }

    function getByCategoryDificulty(category){

        var defer = $q.defer(),
            lengthItems = Dificultad.getDificultad().items,
             url = ProperURL.returnURL('data/icons.json');

        $http.get(url)
            .success(function(data) {
                var icons = data.filter(function(entry){
                    return entry.id_categoria == category;
                })
                icons = icons.splice(0,lengthItems);
                defer.resolve(icons);
            });

        return defer.promise;
    }



    return {
        getAll: getAll,
        getByCategoryDificulty : getByCategoryDificulty
        }

  }]);

baseServices .factory('Categorias', ['$http', '$q', '$filter', '$timeout','ProperURL',
  function($http, $q, $filter, $timeout, ProperURL){

    function getAll(){
        var defer = $q.defer(),
         url = ProperURL.returnURL('data/categorias.json');

        $http.get(url)
            .success(function(advertisers) {
                defer.resolve(advertisers);
            })
            .error(function(){
              alert('erro');
            });
        return defer.promise;
    }

    return {
        getAll: getAll
        }

}]);

baseServices .factory('Dificultad', ['$http', '$q', '$filter', '$timeout','ProperURL',
  function($http, $q, $filter, $timeout, ProperURL){
    var selectedDificultad = {};

    function getAll(){
        var defer = $q.defer(),
          url = ProperURL.returnURL('data/dificultad.json');

        $http.get(url)
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

baseServices .factory('ProperURL', [
  function(){

    function returnURL (url){
      if(ionic.Platform.isAndroid()){
        url = "/android_asset/www/" + url;
      }
      return url;
    }

    return {
        returnURL : returnURL
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
      var mediaRes;

        function media(src){
          if (status === mediaRes.MEDIA_STOPPED) {
             mediaRes = new Media(src,
              function onSuccess() {
                 // release the media resource once finished playing
                 mediaRes.release();
              },
              function onError(e){
                  console.log("error playing sound: " + JSON.stringify(e));
              });
           }
        }

        function load(src){
          var src;
          if(ionic.Platform.isAndroid()){
            src = '/android_asset/www/' + src;
            media(src);
            mediaRes.play();

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