qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'maps').getFullName(), [
		"$rootScope", 
		"game.factory.grid-block", 
		"game.factory.players", 
		"game.factory.units", 
		"game.factory.grid", 
		"game.factory.help-window", 
	function($scope, Block, players, units, grid, help) {
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
		var obj = {
			chosen: 0,
			list: [],
			generators: [
				function() {
					var player = instantiateHumanPlayer();
					var map = new Map({
						tier: 0, number: 1, label: "Bootstrap Camp 1", width: 8, height: 8,
						teams: [
							player,
							(function() {
								var p = players.instantiate("Simple");
								p.colour = "#00f";
								return p;
							})(),
						],
						evaluateVictory: function() {
							var scope = this;
							// Player needs to claim 5 tiles and obtain 50 memory.
							var totalBlocks = 3;
							var totalMemory = 3;
							scope.objectives.blocks = "";
							scope.objectives.resource = "";
							var team = scope.hci[0];
							//angular.forEach(scope.hci, function(team) {
								scope.objectives.blocks = "Blocks: "+team.blocks.length+"/"+totalBlocks;
								scope.objectives.resource = "Calculations: "+team.resource+"/"+totalMemory;
							//});
							// Victory if enough blocks are claimed.
							if (team.blocks.length>=totalBlocks && team.resource>=totalMemory) {
								scope.setVictory();
							}
							// Defeat needs to be set
							var ai = scope.ai[0];
							if (ai.blocks.length>(scope.width*scope.height)-totalBlocks) {
								scope.setDefeat("The AI has claimed too many blocks to make victory possible. Wipe and start again.");
							}
						},
					});
					map.intro.push(new help.HelpWindow({
						content: {
							header: map.number+": "+map.label,
							body:"Your first exercise is going to be under controlled conditions. This is so that I can confirm you are reasonably operational. I can wipe the drive when you're done.",
						},
					}));
					map.intro.push(new help.HelpWindow({
						content: {
							header: map.number+": "+map.label,
							body:"And here is another page of stuff.",
						},
					}));
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
				},
				function() {
					var player = instantiateHumanPlayer();
					var map = new Map({
						tier: 0, number: 2, label: "Bootstrap Camp 2", width: 8, height: 8,
						teams: [
							player,
							(function() {
								var p = players.instantiate("Simple");
								p.colour = "#00f";
								return p;
							})(),
						],
						evaluateVictory: function() {
							var scope = this;
							// Player needs to claim 5 tiles and obtain 50 memory.
							var totalBlocks = 3;
							var totalMemory = 3;
							scope.objectives.blocks = "";
							scope.objectives.resource = "";
							var team = scope.hci[0];
							//angular.forEach(scope.hci, function(team) {
								scope.objectives.blocks = "Blocks: "+team.blocks.length+"/"+totalBlocks;
								scope.objectives.resource = "Calculations: "+team.resource+"/"+totalMemory;
							//});
							// Victory if enough blocks are claimed.
							if (team.blocks.length>=totalBlocks && team.resource>=totalMemory) {
								scope.setVictory();
							}
							// Defeat needs to be set
							var ai = scope.ai[0];
							if (ai.blocks.length>(scope.width*scope.height)-totalBlocks) {
								scope.setDefeat("The AI has claimed too many blocks to make victory possible. Wipe and start again.");
							}
						},
					});
					map.intro.push(new help.HelpWindow({
						content: {
							header: map.number+": "+map.label,
							body:"In this exercise, you will use your hard-earned resources to generate new claimer programs.",
						},
					}));
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

					return map;
				},
			],
			getChosen: function() {
				return obj.list[obj.chosen];
			},
		};
		angular.forEach(obj.generators, function(generator) {
			obj.list.push(generator());
		});
		angular.forEach(obj.list, function(map) {
			for(var x=0;x<map.width;x++) {
				for(var y=0;y<map.height;y++) {
					map.setBlock(new Block(x,y));
				}
			}
			var previous;
			angular.forEach(map.intro, function(helpWindow, key) {
				var last = (key*1)+1>=map.intro.length;
				var helpKey = map.tier+map.number+key;
				if (previous) {
					helpWindow.previous = previous.obj;
					previous.obj.next = helpWindow;
				} else {
					
				}
				helpWindow.close = true;

				//help.list[helpKey] = helpWindow;
				previous = {obj:helpWindow, key:helpKey};
			});
			//help.setChosen(map.intro[0]);
			angular.forEach(map.teams, function(team) {
				team.update();
			});
			map.evaluateVictory();
		});
		return obj;
	}]);
});
