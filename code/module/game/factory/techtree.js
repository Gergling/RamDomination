qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'techtree').getFullName(), [
		"$rootScope", 
		"object.factory.inherit", 
		"game.factory.TechItem", 
		"game.factory.abilities", 
	function($scope, inherit, Technology, abilities) {
		var config = {
			"Factory":"",
			"Infiltrator":"Factory",
			"Constructor":"Factory",
			"Destructor":["Factory",3],
			"Nullifier":["Destructor",3],
			"Reach":["Destructor",3],
			"Integral":["Factory",3],
			"Wrapper":["Integral",3],
			"Reintegrate":["Factory",3],
		};
		var techs = {};

		var techtree = {
			techs: [],
			save: function() {
			},
			load: function() {
			},
			getLevel: function(name) {
				var tech = techs[name];
				if (tech) {
					return tech.level;
				} else {
					// If the technology doesn't exist, return 1. We assume it's available unless otherwise stated.
					return 1;
				}
			},
			getNode: function(name) {
				return techs[name];
			},
			chosen: "Destructor",
			setChosen: function(name) {
				techtree.chosen = name;
			},
			getChosen: function() {
				return techs[techtree.chosen];
			},
		};

		// Build structure
		jQuery.each(config, function(name) {
			techs[name] = new Technology();
			techs[name].name = name;
			techs[name].url = ["#", "tech", name].join("/");
		});
		angular.forEach(techs, function(tech) {
			techtree.techs.push(tech);
			var name = tech.getName();
			var data = config[name];
			if (angular.isArray(data)) {
				parentName = data[0];
				tech.max = data[1];
			} else {
				parentName = data;
			}
			var parent = techs[parentName];
			if (parent) {
				tech.setParent(parent);
			} else {
				techtree.root = tech;
			}
			if (abilities.options[name]) {
				tech.ability = new abilities.options[name];
			}
		});

		return techtree;
	}]);
});
