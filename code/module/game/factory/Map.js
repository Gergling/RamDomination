qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Map').getFullName(), [
		"$rootScope", 
		"game.factory.grid-block", 
		"game.factory.players", 
		"game.factory.units", 
		"game.factory.grid", 
		"game.factory.help-window", 
	function($scope, Block, players, units, grid, help) {
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
			this.evaluateVictory = function() {
				// By default, victory is established by being the last man standing.
				angular.forEach(scope.teams, function(team) {
					// Assign victory
					// Everyone else gets defeat
				});
			};

			this.objectives = {};
			this.intro = [];

			angular.forEach(properties, function(property, name){
				scope[name] = property;
			});
			angular.forEach(this.teams, function(team, idx) {
				if (team.hci) {
					scope.hci.push(team);
				} else {
					scope.ai.push(team);
				}
				team.map = scope;
				team.idx = idx;
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
			this.iterateBlocks = function(fnc) {
				return grid.iterateBlocks(this.grid, fnc);
			};
			this.resolveResources = function() {
				angular.forEach(scope.teams, function(team) {
					team.resolveResources(scope);
				});
			};
			
			this.victoryMessage = new help.HelpWindow({
				content: {header: "Victory",},
			});
			this.defeatMessage = new help.HelpWindow({
				content: {
					header: "Defeat",
					body:"You've been defeated somehow.",
				},
			});
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
		};
		return Map;
	}]);
});
