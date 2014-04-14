qh.component('game', function(ngm, qhm) {
	ngm.directive('gameGrid', function() {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: qhm.getPath()+"/partial/grid.html",
			controller: [
				"$scope", 
				"game.factory.maps", 
				"game.factory.grid", 
			function($scope, maps, grid) {
				$scope.blockSize = 50;
				$scope.grid = maps.getChosen();
				$scope.dimensions = {
					width: $scope.grid.width * $scope.blockSize,
					height: $scope.grid.height * $scope.blockSize,
				};
				
				$scope.selectText = {
					x:{name:"x", label:"X"},
					y:{name:"y", label:"Y"},
					ownership:{name:"ownership", label:"Ownership"},
					structure:{name:"structure", label:"Structure"},
					unit:{name:"unit", label:"Unit"},
				};
				$scope.selectedBlock = {};
				$scope.hoverText = jQuery.extend(true, {}, $scope.selectText);
				
				$scope.hoverBlock = function(x,y) {
					var block = $scope.grid.grid[x][y];
					angular.forEach($scope.hoverText, function(text) {
						text.value = block[text.name];
					});
				};
				
				$scope.clickBlock = function(x,y) {
					var previousBlock = $scope.selectedBlock;
					var block = $scope.grid.grid[x][y];
					block.clickAction();
					
					$scope.selectedBlock = block;
					angular.forEach($scope.selectText, function(text) {
						text.value = block[text.name];
					});

					grid.unselect($scope.grid);
					grid.select($scope.grid, x,y);
				};
				// Make select keep a block somewhere. Grid is already in scope.
				
				$scope.cycle = function() {
					// Reset all the player abilities.
					$scope.grid.applyHCITeams(function(team) {
						team.reset();
					});
					// Kick off all the AI moves.
					$scope.grid.runAI();
					// Everything needs to come back around to being controllable by the|a player.
				};
			}],
		};
	});
});
