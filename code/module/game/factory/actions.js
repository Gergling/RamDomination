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
			this.click = function(x1,y1,x2,y2) {
				
			};
			this.activate = function(block, map) {};
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
					this.activate = function(block, map) {
						// User clicks move button to move unit. Several options come up for movement destinations.
						// Highlight all surrounding blocks, dependent on ownership and distance from the given block.
						//angular.forEach(map.grid, function(block2) {
						grid.iterateBlocks(map.grid, function(block2) {
							if (block!==block2) {
								var speed = 0;
								if (block2.ownership === block.ownership) {
									// Owned by the same player
									speed = scope.speed.claimed;
								} else if (block2.ownership) {
									// Owned by a different player
									speed = scope.speed.enemy;
								} else {
									// Has no owner
									speed = scope.speed.unclaimed;
								}
								if (speed>0 && block2.getDistance(block)<=speed) {
									block2.highlight();
									//block2.clickAction = // pass scope into a function for this.
								}
							}
						});
					};
					this.complete = function() {
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
