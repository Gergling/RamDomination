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
		var Map = function(properties) {
			var scope = this;
			this.grid = {};
			this.hci = [];
			this.ai = [];
			this.teams = [];
			this.tier = -1;
			this.number = 0;
			this.label = "(Uncharted Territory)";
			this.width = 0;
			this.height = 0;

			angular.forEach(properties, function(property, name){
				scope[name] = property;
			});
			angular.forEach(this.teams, function(team) {
				if (team.hci) {
					scope.hci.push(team);
				} else {
					scope.ai.push(team);
				}
			});

			this.applyHCITeams = function(fnc) {
				angular.forEach(scope.hci, fnc);
			};
			this.runAI = function() {
				angular.forEach(scope.ai, function(team) {
					team.runAI();
					team.runAbilities();
					team.reset();
				});
			};
			this.setBlock = function(block, override) {
				grid.setBlock(this.grid, block, override);
				block.map = this;
			};
		};
		var obj = {
			chosen: 0,
			list: [
				(function() {
					var player = instantiateHumanPlayer();
					var map = new Map({
						tier: 0, number: 0.1, label: "Bootstrap Camp", width: 8, height: 8,
						teams: [
							player,
							(function() {
								var p = players.instantiate("Simple");
								p.colour = "#00f";
								return p;
							})(),
						],
						// Also needs default win conditions - e.g. no player units or structures left, otherwise overwritten by map-specific options.
					});
					angular.forEach([
						new Block(0,0),
						new Block(7,7),
					], function(block, idx) {
						var team = map.teams[idx];
						block.ownership = team;
						block.structure;
						block.setUnit(units.instantiate("Claimer"));
						block.unit.team = team;
						team.addProgram(block.unit);
						map.setBlock(block);
					});
					var block = new Block(0,1);
					block.ownership = player;
					map.setBlock(block);

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
					map.setBlock(new Block(x,y));
				}
			}
		});
		return obj;
	}]);
});
