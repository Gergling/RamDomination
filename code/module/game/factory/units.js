qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'units').getFullName(), [
		"$rootScope", 
		"game.factory.abilities",
		"game.factory.actions",
		"object.factory.inherit", 
	function($scope, abilities, actions, inherit) {
		var Unit = function() {
			var scope = this;
			this.block;
			this.ownership;
			this.integrity = 1;
			this.label = "";
			this.abilities = {};
			this.addAbility = function(name) {
				if (!this.abilities[name]) {
					this.abilities[name] = abilities.instantiate(name);
				}
				this.abilities[name].instantiate();
				this.abilities[name].setActions(this);
			};
			this.actions = {};
			this.setAction = function(name) {
				if (!this.actions[name]) {
					this.actions[name] = actions.instantiate(name);
				}
				//this.actions[name].instantiate(name);
				return this.getAction(name);
			};
			this.setActions = function() {
				angular.forEach(this.abilities, function(ability) {
					angular.forEach(ability.actions, function(action) {
						//scope.actions.push(action);
						//scope.setAction(action.name);
					});
				});
			};
			this.getAction = function(name) {
				return this.actions[name];
			};

			// Needs to be able to output a list of valid actions.
			// - Blocks which can be attacked.
			// - Blocks which can be moved to.
		};
		var units = {
			options: {
				Claimer: function() {
					this.label = "Claimer";
					// Can move to adjacent blocks owned by team or unclaimed.
					// Cannot move on enemy territory.
					// Can claim current block for own team.
					this.addAbility("Claimer");
					
					// These allow the unit to move across claimed and unclaimed blocks.
					this.addAbility("Mobile");
					this.addAbility("Explorer");
				},
			},
		};
		units.instantiate = function(name) {
			var obj = inherit.extend(Unit, units.options[name]);
			obj.name = name;
			obj.setActions();
			return obj;
		};

		return units;
	}]);
});
