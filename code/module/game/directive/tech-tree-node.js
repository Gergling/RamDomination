qh.component('game', function(ngm, qhm) {
	ngm.directive('techTreeNode', function() {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: qhm.getPath()+"/partial/tech-tree-node.html",
			controller: [
				"$scope", 
				"$attrs", 
				"game.factory.techtree", 
			function($scope, $attrs, techtree) {
				$scope.$watch('$attrs.name', function() {
					if ($attrs.name) {
						$scope.node = techtree.getNode($attrs.name);
					} else {
						$scope.node = techtree.root;
					}
					console.log($scope.node, $attrs.name);
					if ($scope.node) {
						$scope.wrapper = qhm.getPath()+"/partial/tech-tree-node-wrapper.html";
					}
				});
			}],
		};
	});
});
