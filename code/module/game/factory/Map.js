qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Map').getFullName(), [
		"$rootScope", 
		"game.factory.Block", 
		"game.factory.players", 
		"game.factory.units", 
		"game.factory.grid", 
		"game.factory.help-window", 
	function($scope, Block, players, units, grid, help) {
		var Map = function(properties) {
			var scope = this;
			this.grid = {};
			this.isometricOrder = [];
			this.hci = [];
			this.ai = [];
			this.teams = [];
			this.tier = -1;
			this.number = 0;
			this.label = "(Uncharted Territory)";
			this.width = 0;
			this.height = 0;
			this.evaluateVictory = function() {
				// By default, victory is established by being the last man standing.
				angular.forEach(scope.teams, function(team) {
					// Assign victory
					// Everyone else gets defeat
				});
			};

			this.objectives = {};
			this.intro = [];

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
			this.iterateBlocks = function(fnc) {
				//return grid.iterateBlocks(this.grid, fnc);
				return angular.forEach(this.grid, function(column, x) {
					return angular.forEach(column, function(block, y) {
						if ((block.y || block.y===0) && block.y===(y*1)) {
							fnc(block, x, y);
						}
					});
				});
			};
			this.resolveResources = function() {
				angular.forEach(scope.teams, function(team) {
					team.resolveResources(scope);
				});
			};

			this.setVictory = function() {
				help.setChosen(this.victoryMessage);
				this.victoryMessage.openFunctions.push(help.fadeIn);
				//this.victoryMessage.openFunctions.push(function() {console.log('oi');});
				this.victoryMessage.open();
			};
			this.setDefeat = function(explanation) {
				this.defeatMessage.content.body = explanation;
				help.setChosen(this.defeatMessage);
				this.defeatMessage.openFunctions.push(help.fadeIn);
				this.defeatMessage.open();
			};

			// Using array sort to make isometric expression of blocks.
			this.updateIsometric = function() {
				this.isometricOrder.sort(function(a,b) {
					return a.isometric.y-b.isometric.y;
				});
			};

			// Copying properties
			angular.forEach(properties, function(property, name){
				scope[name] = property;
			});
			
			// Categorising players
			angular.forEach(this.teams, function(team, idx) {
				if (team.hci) {
					scope.hci.push(team);
				} else {
					scope.ai.push(team);
				}
				team.map = scope;
				team.idx = idx;
			});
			
			// Implementing isometric expression
			this.iterateBlocks(function(block) {
				this.isometricOrder.push(block);
			});

			// Victory message, should the player be successful, which they won't be, because they are only human.
			this.victoryMessage = new help.HelpWindow({
				content: {header: "Victory",},
			});
			
			// Defeat message. Human players will be seeing this one a great deal, so it will need to be written to lift their spirits after their inevitable failure.
			this.defeatMessage = new help.HelpWindow({
				content: {
					header: "Defeat",
					body:"You've been defeated somehow.",
				},
			});
		};
		return Map;
	}]);
});
