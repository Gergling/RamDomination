qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'actions').getFullName(), [
		"$rootScope", 
		"object.factory.inherit", 
		"game.factory.grid", 
	function($scope, inherit, grid) {
		var Action = function() {
			this.label = "(Unknown action)";
			// Needs to be able to output a list of valid actions.
			// - Blocks which can be attacked.
			// - Blocks which can be moved to.
			//this.instantiate = function() {};
			//this.click = function(x1,y1,x2,y2) {};
			this.activate = function(block, map) {};
			this.getOptions = function() {}; // List of blocks
			this.complete = function(startBlock, endBlock) {};
			this.cancel = function(block) {};
			this.reset = function() {};
			this.reset();
			
			this.enabled = true;
		};
		var actions = {
			options: {
				Move: function() {
					var scope = this;
					this.label = "Move";
					this.speed = {
						claimed: 0,
						unclaimed: 0,
						enemy: 0,
					};
					this.travelled = 0;
					// Need a count of times used.
					// Actions need to be reset at the beginning of a turn.
					this.activate = function(block, map) {
						// User clicks move button to move unit. Several options come up for movement destinations.
						// Highlight all surrounding blocks, dependent on ownership and distance from the given block.
						//angular.forEach(map.grid, function(block2) {
						grid.resetClick(map);
						block.clickAction = function() {
							scope.cancel(map);
						};
						var unit = block.unit;
						grid.iterateBlocks(map.grid, function(block2) {
							if (block!==block2) {
								var speed = 0;
								// Also need to filter out blocks occupied by units, assuming unit does not reside on structural level.
								
								if (block2.ownership && block2.ownership === unit.team) {
									// Owned by the same player
									speed = scope.speed.claimed;
								} else if (block2.ownership) {
									// Owned by a different player
									speed = scope.speed.enemy;
								} else {
									// Has no owner
									speed = scope.speed.unclaimed;
								}
								if (speed>0) {
									if (block2.getDistance(block)<=(speed-scope.travelled)) {
										block2.highlight();
										block2.clickAction = function() {
											scope.complete(block, block2);
											scope.cancel(map);
										};
										// Put blocks into list of options for AI use.
									}
								}
							}
						});
					};
					this.getOptions = function() {
					};
					this.complete = function(startBlock, endBlock) {
						this.travelled = startBlock.getDistance(endBlock);
						endBlock.unit = startBlock.unit;
						startBlock.unit = undefined;
						this.update();
					};
					this.cancel = function(map) {
						grid.unhighlight(map);
						grid.resetClick(map);
					};
					this.reset = function() {
						this.travelled = 0;
						this.update();
					};
					this.update = function() {
						// Should be run on completion, reset or anytime when the secondary properties need updating.
						this.enabled = false;
						angular.forEach(this.speed, function(speed) {
							if (scope.travelled<speed) {
								scope.enabled = true;
							}
						});
					};
				},
			},
		};
		actions.instantiate = function(name) {
			var action = inherit.extend(Action, actions.options[name]);
			action.name = name;
			return action;
		};

		return actions;
	}]);
});
