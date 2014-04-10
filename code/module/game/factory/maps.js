qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'maps').getFullName(), [
		"$rootScope", 
		"game.factory.grid-block", 
		"game.factory.players", 
		"game.factory.units", 
		"game.factory.grid", 
	function($scope, Block, players, units, grid) {
		var instantiateHumanPlayer = function() {
			var player = players.instantiate("Human");
			player.colour = "#f00";
			return player;
		};
		var obj = {
			chosen: 0,
			list: [
				(function() {
					var player = instantiateHumanPlayer();
					var map = {
						tier: 0, number: 0.1, label: "Bootstrap Camp", width: 8, height: 8,
						teams: [
							player,
							(function() {
								var p = players.instantiate("Simple");
								p.colour = "#00f";
								return p;
							})(),
						],
						human: player,
						// Also needs default win conditions - e.g. no player units or structures left, otherwise overwritten by map-specific options.
					};
					map.grid = (function() {
						var mapGrid = {
						};

						angular.forEach([
							new Block(0,0),
							new Block(7,7),
						], function(block, idx) {
							var team = map.teams[idx];
							block.ownership = team;
							block.structure;
							block.unit = units.instantiate("Claimer");
							grid.setBlock(mapGrid, block);
						});

						return mapGrid;
					})();
					return map;
				})(),
			],
			getChosen: function() {
				return obj.list[obj.chosen];
			},
		};
		angular.forEach(obj.list, function(map) {
			for(var x=0;x<map.width;x++) {
				for(var y=0;y<map.height;y++) {
					grid.setBlock(map.grid, new Block(x,y));
				}
			}
		});
		return obj;
	}]);
});
