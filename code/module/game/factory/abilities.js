qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'abilities').getFullName(), [
		"$rootScope", 
		"object.factory.inherit", 
		//"game.factory.actions", 
	function($scope, inherit) {
		var Ability = function() {
			this.label = "(Unknown ability)";
			this.description = "(No description)";
			// Needs to be able to output a list of valid actions.
			// - Blocks which can be attacked.
			// - Blocks which can be moved to.
			//this.instantiate = function() {};
			this.unit;
			this.setActions = function(unit) {
			};
			/*this.actions = {};
			this.setAction = function(name) {
				if (!this.actions[name]) {
					this.actions[name] = actions.instantiate(name);
				}
				this.actions[name].instantiate(name);
				return this.getAction(name);
			};
			this.getAction = function(name) {
				return this.actions[name];
			};*/

			// Run at the end of the player's turn.
			this.endTurn = function() {
			};
			this.run = function() {
			};
		};
		var abilities = {
			options: {
				Structure: function() {
					// Can reside within a block at the structural level. Should probably get a damage resistance stat of some kind.
					this.label = "Structure";
				},
				Mobile: function() {
					this.label = "Mobile";
					this.description = "Can move into adjacent claimed blocks";
					this.setActions = function() {
						var action = this.unit.setAction("Move");
						action.speed.claimed++;
					};
				},
				Explorer: function() {
					this.description = "Can move into adjacent unclaimed blocks";
					this.label = "Explorer";
					this.setActions = function(unit) {
						var action = unit.setAction("Move");
						action.speed.unclaimed++;
					};
				},
				Infiltrator: function() {
					// Can move into adjacent squares owned by another program.
					this.label = "Infiltrator";
				},
				Quick: function() {
					// Can take an extra move action.
					this.label = "Quick";
				},
				Durable: function() {
					// Has an extra point of integrity.
					this.label = "Durable";
				},
				Claimer: function() {
					this.description = "Claims the current square for the owner when moved there";
					this.label = "Claimer";
					// Needs a way to run this at the end of the player's turn.
					this.run = function() {
						this.unit.block.ownership = this.unit.team;
						// Get the block associated with the unit associated with this ability.
						// Change the ownership of the block.
					};
				},
			},
		};
		abilities.instantiate = function(name) {
			var ability = inherit.extend(Ability, abilities.options[name]);
			//ability.setActions();
			return ability;
		};

		return abilities;
	}]);
});
