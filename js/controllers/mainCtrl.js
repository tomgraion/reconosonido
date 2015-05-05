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

baseControllers.controller('mainView', ['$scope', '$stateParams','Icons','Media',
  function mainView($scope ,$stateParams ,Icons ,Media) {

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
      $scope.icons = data;
      Media.setMedias(data);
    });


}]);

