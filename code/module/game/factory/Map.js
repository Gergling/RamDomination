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
			this.bridges = {};
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
			this.hasBlock = function(x,y) {
				if (!this.grid[x]) {return false;}
				var block = this.grid[x][y];
				if (!block) {return false;}
				return ((block.y || block.y===0) && block.y===(y*1));
			};
			this.getBlock = function(x,y) {
				return this.grid[x][y];
			};
			this.setBlock = function(block, override) {
				var add = false;
				var x = block.x;
				var y = block.y;
				if (!this.grid[x]) {
					this.grid[x] = {};
					add = true;
				}
				if (!this.grid[x][y]) {
					add = true;
				}
				if (!this.grid[x][y] || override) {
					this.grid[x][y] = block;
				}

				//grid.setBlock(this.grid, block, override);
				block.map = this;
				if (add) {this.isometricOrder.push(block);}
			};
			this.iterateBlocks = function(fnc) {
				//return grid.iterateBlocks(this.grid, fnc);
				return angular.forEach(this.grid, function(column, x) {
					return angular.forEach(column, function(block, y) {
						//if ((block.y || block.y===0) && block.y===(y*1)) {
							//fnc(block, x, y);
						//}
						fnc(block, x, y, ((block.y || block.y===0) && block.y===(y*1)));
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

			this.unselect = function() {
				this.iterateBlocks(function(block, x, y, blockExists) {
					if (blockExists) {block.unselect();}
				});
			};
			this.select = function(x,y) {
				this.getBlock(x,y).select();
			};

			var Bridge = function(block1, block2) {
				this.block1 = block1;
				this.block2 = block2;
				this.getKey = function() {
					var key = [];
					if (this.block1.x<this.block2.x) {
						key.push(this.block1.x);
						key.push(this.block1.y);
						key.push(this.block2.x);
						key.push(this.block2.y);
					} else {
						key.push(this.block2.x);
						key.push(this.block2.y);
						key.push(this.block1.x);
						key.push(this.block1.y);
					}
					return key.join("-");
				};
				this.key = this.getKey();
				this.isometric = {
					x: (this.block1.isometric.x+this.block2.isometric.x)/2,
					y: (this.block1.isometric.y+this.block2.isometric.y)/2,
				};
				this.bgPos = 0;
				if (block1.y===block2.y) {
					this.bgPos = -13;
				}
			};
			
			// Generate bridges according to adjacent blocks.
			this.updateBridges = function() {
				// Need a reliable method of notation for adjacency.
				// We know that any two blocks can be compared for adjacency using the block.getDistance()==1 condition.
				// If we iterate, we can store the previous block.
				// The map could have a function to return all blocks adjacent to a block.
				// Bridge locations could be stored with x1-y1-x2-y2, where x1<x2
				this.iterateBlocks(function(block1, x, y, blockExists) {
					if (blockExists) {
						var blocks = scope.getAdjacentBlocks(block1, 1);
						angular.forEach(blocks, function(block2) {
							if (block1!==block2) {
								var bridge = new Bridge(block1,block2);
								if (!scope.bridges[bridge.key]) {
									scope.bridges[bridge.key] = bridge;
								}
							}
						});
					}
				});
			};
			
			this.getAdjacentBlocks = function(block, distance) {
				var blocks = [];
				for(var dx=-distance;dx<=distance;dx++) {
					var bx = block.x+dx;
					for(var dy=-distance+Math.abs(dx);dy<=distance-Math.abs(dx);dy++) {
						var by = block.y+dy;
						if (block.x!==bx||block.y!==by) {
							if (this.hasBlock(bx,by)) {
								blocks.push(this.getBlock(bx,by));
							}
						}
					}
				}
				return blocks;
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
