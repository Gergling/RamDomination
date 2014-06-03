qh.getModule('application').config([
		'$routeProvider', 
	function($routeProvider, navigation) {
		$routeProvider.when('/', {templateUrl: 'module/application/partial/dashboard.html'});
		$routeProvider.when('/play/:map/', {templateUrl: 'module/game/partial/play.html',});
		$routeProvider.when('/tech/', {templateUrl: 'module/game/partial/tech-tree-full.html',});
		$routeProvider.when('/tech/:tech/', {templateUrl: 'module/game/partial/tech-tree-full.html',});
		/*navigation.loopRoutes(function(route) {
			$routeProvider.when(route.route, route);
		});*/
		
		/*var routeActions = {
			'/play/:map/':'play',
		};
		
		angular.forEach(routeActions, function(action, route) {
			$routeProvider.when(route, {
				templateUrl: 'module/application/partial/game.html',
				action: action,
				include: ['module/game/partial/', action, '.html'].join(''),
			});
		});*/

		$routeProvider.otherwise({templateUrl: 'module/application/partial/404.html'});
	}
]);
