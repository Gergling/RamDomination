qh.getModule('application').controller("application.controller.index", [
	"$rootScope", 
	"$location", 
	"$route", 
	"game.factory.maps", 
	"game.factory.techtree", 
	function($scope, $location, $routeConfig, maps, techtree) {
		$scope.$on('$routeChangeSuccess', function (scope, current, previous) {
			maps.chosen = current.params.map;
			techtree.chosen = current.params.tech;
			$scope.include = current.include;
		});
		$scope.include = "";
	}
]);
