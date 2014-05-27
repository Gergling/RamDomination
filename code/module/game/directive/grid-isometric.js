qh.component('game', function(ngm, qhm) {
	ngm.directive('gridIsometric', function() {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: qhm.getPath()+"/partial/grid-isometric.html",
			controller: [
				"$scope", 
				"$element", 
				"game.factory.maps", 
				"game.factory.grid", 
			function($scope, $element, maps, grid) {
				$scope.blockSize = {
					width: 50,
					height: 26, // 50*Math.sin(Math.PI*30/360)/Math.sin(Math.PI*60/360)
				};
				$scope.bridgeSize = {
					width: 25,
					height: 26,
				};
				$scope.map = maps.getChosen();
				//console.log($scope.map);
				$scope.dimensions = {
					width: ($scope.map.width * $scope.blockSize.width * 2)+$scope.blockSize.width,
					height: ($scope.map.height * $scope.blockSize.height * 2)+$scope.blockSize.height,
				};
				$scope.offsets = {
					left: $scope.blockSize.width,
					top: ($scope.map.height * $scope.blockSize.height)/*-($scope.blockSize.height)*/,
				};
				$scope.unclaimedColour = 'white';
				$scope.$watch('$element.width', function() {
					if ($element.width) {
						$element.width($scope.dimensions.width);
						$element.height($scope.dimensions.height);
					}
				});
				
				$scope.clickBlock = function(x,y) {
					//var previousBlock = $scope.selectedBlock;
					var block = $scope.map.getBlock(x,y);
					block.clickAction();
					
					/*$scope.selectedBlock = block;
					angular.forEach($scope.selectText, function(text) {
						text.value = block[text.name];
					});*/
					grid.block.select = block;
					console.log(block);

					$scope.map.unselect();
					$scope.map.select(x,y);
				};
				$scope.hoverBlock = function(x,y) {
					var block = $scope.grid.grid[x][y];
					angular.forEach($scope.hoverText, function(text) {
						text.value = block[text.name];
					});
				};
			}],
		};
	});
});
