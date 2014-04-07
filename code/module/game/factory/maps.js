qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'maps').getFullName(), [
		"$rootScope", 
		"game.factory.grid-block", 
		"game.factory.players", 
		"game.factory.units", 
	function($scope, Block, players, units) {
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
						teams: [player], // Get an instance of player
						grid: (function() {
							var grid = {};
							var playerBlock = new Block(0,0);
							playerBlock.ownership = player;// Get player.
							playerBlock.structure;// Get claimer factory program instance.
							playerBlock.unit = units.instantiate("Claimer");
							grid[playerBlock.x] = {};
							grid[playerBlock.x][playerBlock.y] = playerBlock;
							return grid;
						})(),
						// Also needs default win conditions - e.g. no player units or structures left, otherwise overwritten by map-specific options.
					};
					return map;
				})(),
			],
			getChosen: function() {
				return obj.list[obj.chosen];
			},
		};
		angular.forEach(obj.list, function(map) {
			for(var x=0;x<map.width;x++) {
				if (!map.grid[x]) {map.grid[x] = {};}
				for(var y=0;y<map.height;y++) {
					if (!map.grid[x][y]) {
						map.grid[x][y] = new Block(x,y);
					}
				}
			}
		});
		return obj;
	}]);
});
