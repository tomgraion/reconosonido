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
      console.log(Dificultad.getDificultad());
      }

}]);

baseControllers.controller('mainView', ['$scope', '$stateParams','Icons',
  function mainView($scope,$stateParams,Icons) {

    $scope.img_src = "img/"

    Icons.getByCategoryDificulty($stateParams.categoria)
    .then(function (data) {
      $scope.icons = data;
      });

}]);

