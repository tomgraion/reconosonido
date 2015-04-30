// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //alert(device.platform);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('TodoCtrl', function($scope,$filter) {

 

    $scope.current_id = 0;
    $scope.img_src='img/';
    $scope.sound_on = false;
    var current_sound = 0;
    var current_id_par = 0;

    var correct_sound = "sounds/correct.mp3";
    var wrong_sound = "sounds/wrong.mp3";

    $scope.categorias = [

        { title: 'Animales' , id: 1 },
        { title: 'Cotidianos' , id: 2 },
        { title: 'Cuerpo Humano' , id: 3 },
        { title: 'Naturaleza' , id: 4 },
        { title: 'Instrumentos' , id: 5}

    ];

    $scope.icons = [

          { title: 'Gato' , img:'animales/gato.jpg' , url:'sounds/animales/gato.mp3' ,   id_tipo: 1, id_par: 2 , show: false},
          { title: 'Vaca' , img:'animales/vaca.jpg' , url:'sounds/animales/vaca.mp3' , id_tipo: 1 , id_par: 1, show: true },
          { title: 'Leon' , img:'animales/leon.jpg' , url:'sounds/animales/leon.mp3' , id_tipo: 1 , id_par: 4,  show: true },
          { title: 'Perro' , img:'animales/perro.jpg', url:'sounds/animales/perro.mp3' , id_tipo: 1, id_par: 3, show: true },
          { title: 'Pato' , img:'animales/pato.jpg', url:'sounds/animales/pato.mp3', id_tipo: 1 , id_par: 5, show: true },

          { title: 'Timbre' , img:'cotidianos/timbre.png' , url:'sounds/cotidianos/timbre.mp3' ,   id_tipo: 2, id_par: 2 , show: false},
          { title: 'Inodoro' , img:'cotidianos/inodoro.png' , url:'sounds/cotidianos/inodoro.mp3' , id_tipo: 2 , id_par: 1, show: true },
          { title: 'Puertas' , img:'cotidianos/puertas_batientes.png' , url:'sounds/cotidianos/puerta.mp3' , id_tipo: 2 , id_par: 4,  show: true },
          { title: 'Despertador' , img:'cotidianos/despertador.png', url:'sounds/cotidianos/despertador.mp3' , id_tipo: 2, id_par: 3, show: true },
          { title: 'Aspiradora' , img:'cotidianos/aspiradora.png', url:'sounds/cotidianos/aspiradora.mp3', id_tipo: 2 , id_par: 5, show: true },

          { title: 'Roncar' , img:'cuerpo_humano/roncar.png' , url:'sounds/cuerpo_humano/roncar.mp3' ,   id_tipo: 3, id_par: 2 , show: false},
          { title: 'Risas' , img:'cuerpo_humano/risas.jpg' , url:'sounds/cuerpo_humano/risas.mp3' , id_tipo: 3 , id_par: 1, show: true },
          { title: 'Respirar' , img:'cuerpo_humano/respirar.png' , url:'sounds/cuerpo_humano/respirar.mp3' , id_tipo: 3 , id_par: 4,  show: true },
          { title: 'Gritos' , img:'cuerpo_humano/gritos.png', url:'sounds/cuerpo_humano/gritos.mp3' , id_tipo: 3 , id_par: 3, show: true },
          { title: 'Estornudar' , img:'cuerpo_humano/estornudar.png', url:'sounds/cuerpo_humano/estornudar.mp3', id_tipo: 3 , id_par: 5, show: true },

          { title: 'Viento' , img:'naturaleza/viento.png' , url:'sounds/naturaleza/viento.mp3' ,   id_tipo: 4, id_par: 2 , show: false},
          { title: 'Trueno' , img:'naturaleza/trueno.png' , url:'sounds/naturaleza/trueno.mp3' , id_tipo: 4 , id_par: 1, show: true },
          { title: 'Selva' , img:'naturaleza/selva.png' , url:'sounds/naturaleza/selva.mp3' , id_tipo: 4 , id_par: 4,  show: true },
          { title: 'Mar' , img:'naturaleza/mar.png', url:'sounds/naturaleza/mar.mp3' , id_tipo: 4 , id_par: 3, show: true },
          { title: 'Lluvia' , img:'naturaleza/lluvia.png', url:'sounds/naturaleza/lluvia.mp3', id_tipo: 4 , id_par: 5, show: true },

          { title: 'Triangulo' , img:'instrumentos/triangulo.png' , url:'sounds/instrumentos/triangulo.mp3' ,   id_tipo: 5, id_par: 2 , show: false},
          { title: 'Piano' , img:'instrumentos/piano.png' , url:'sounds/instrumentos/piano.mp3' , id_tipo: 5 , id_par: 1, show: true },
          { title: 'Guitarra' , img:'instrumentos/guitarra.png' , url:'sounds/instrumentos/guitarra.mp3' , id_tipo: 5 , id_par: 4,  show: true },
          { title: 'Campanas' , img:'instrumentos/campanas.png', url:'sounds/instrumentos/campanas.mp3' , id_tipo: 5 , id_par: 3, show: true },
          { title: 'Batería' , img:'instrumentos/bateria.png', url:'sounds/instrumentos/bateria.mp3', id_tipo: 5 , id_par: 5, show: true }
    ];


    function reboot_icons (){
        angular.forEach($scope.icons, function(value, key) {
          value['show'] = true;
        });
      //expect(log).toEqual(['name: misko', 'gender: male']);
    }


    //Crea Iconos E Inicializa Las Categorias
    $scope.init_categoria = function (id){

      reboot_icons();

       $scope.current_id = id;
       current_sound = 0;
       //alert(id);
       //console.log(id);
       $scope.current_sounds = $filter('filter')( $scope.icons, { id_tipo : id } );
       $scope.current_sounds = shuffleArray($scope.current_sounds);
    }

    $scope.play_sound =  function (){
      var url = $scope.current_sounds[current_sound]['url'];
      current_id_par = $scope.current_sounds[current_sound]['id_par'];
      playAudio(url);
      
    }

    function adminController($scope) {    
      $scope.setMaster = function(obj, $event){
        console.log($event.target);
      }
    }

    $scope.check_correct = function (id_par,icon){

          if(id_par == current_id_par ){
            playAudio(correct_sound);
            icon.show = false;
            current_sound ++;
            
          }else{

            playAudio(wrong_sound);

          }
    }


    function correct (){

    }


    function playAudio(src) {
          // HTML5 Audio
      

          /*
          if (typeof Audio != "undefined") { 
              

              //Descomentar para Android o Ios

              //$scope.sound_on = true;

          // Phonegap media
          } else 
        */


          if (typeof device != "undefined") {
            
              // Android needs the search path explicitly specified
              if (device.platform == 'Android') {
               
                  src = '/android_asset/www/' + src;
              }

              var mediaRes = new Media(src,
                  function onSuccess() {
                     // release the media resource once finished playing
                     mediaRes.release();
                     //$scope.sound_on = false;
                  },
                  function onError(e){
                      console.log("error playing sound: " + JSON.stringify(e));
                  });
               mediaRes.play();
               //$scope.sound_on = true;
         } else {
             new Audio(src).play() ;
             //console.log("no sound API to play: " + src);
         }
      }


});

var shuffleArray = function(array) {
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



 

