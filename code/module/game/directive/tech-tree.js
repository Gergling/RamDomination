qh.component('game', function(ngm, qhm) {
	ngm.directive('techTree', function() {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: qhm.getPath()+"/partial/tech-tree.html",
			controller: [
				"$scope", 
				"$attrs", 
				"game.factory.techtree", 
			function($scope, $attrs, techtree) {
				$scope.tech = techtree.getChosen();
				$scope.techs = techtree.techs;
			}],
		};
	});
});
