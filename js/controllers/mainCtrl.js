'use strict';

baseControllers.controller('iconsList', ['$scope', 'Icons','Categorias',
  function($scope, Icons,Categorias) {

    Icons.getAll()
      .then(function (data) {
        $scope.icons = data;
        console.log($scope.icons);
      });

    Categorias.getAll()
    	.then(function (data) {
	        $scope.categorias = data;
	        console.log($scope.categorias);
      });  

}]);

