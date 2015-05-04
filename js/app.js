var app = angular.module('todo', ['ionic','baseControllers','baseServices']);

/* Services */
var baseServices  = angular.module('baseServices', []);

/* Controllers */
var baseControllers = angular.module('baseControllers', []);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

app.config(function($stateProvider) {
  $stateProvider
  .state('icons', {
    url: 'icons/cat/:categoria',
    templateUrl: 'templates/main.html',
    controller:'mainView'
  })

});
