qh.getModule('application').controller("application.controller.index", [
	"$rootScope", 
	"$location", 
	"$route", 
	"game.factory.maps", 
	//"sequencer.factory.pattern", 
	//"sequencer.factory.navigation", 
	function($scope, $location, $routeConfig, maps/*, pattern, navigation*/) {
		$scope.$on('$routeChangeSuccess', function (scope, current, previous) {
			maps.chosen = current.params.map;
			$scope.include = current.include;
		});
		$scope.include = "";
	}
]);
