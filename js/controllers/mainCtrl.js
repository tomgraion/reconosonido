'use strict';

baseControllers.controller('iconsList', ['$scope', 'Icons','Categorias','Dificultad',
  function($scope, Icons,Categorias,Dificultad) {

    Categorias.getAll()
    	.then(function (data) {
	        $scope.categorias = data;

      });

    Dificultad.getAll()
      .then(function (data) {
          $scope.dificultades = data;
          //Default selected in select Dificultad Select and in factory
          $scope.selectedDificultad = $scope.dificultades[1];
          Dificultad.setDificultad($scope.selectedDificultad);
      });

    $scope.update_selected = function () {
      Dificultad.setDificultad(this.selectedDificultad);
      }

}]);

baseControllers.controller('mainView', ['$scope', '$stateParams','Icons','Media','shuffleArray',
  function mainView($scope ,$stateParams ,Icons ,Media,shuffleArray) {

    $scope.img_src = "img/"

    $scope.play_sound = function (){
        Media.play();
      };

    $scope.check = function (id,icon){
        var check = Media.checkCorrect(id)
        if(check){
          icon.show = false;
        }
      };

    Icons.getByCategoryDificulty($stateParams.categoria)
    .then(function (data) {
      var duplicated_data = [];
      $scope.icons = shuffleArray.shuffle(data);
      $scope.player_show = true;
      //Copies array and sends it to media
      angular.copy(data,duplicated_data);
      Media.setMedias(duplicated_data);
    });


}]);

