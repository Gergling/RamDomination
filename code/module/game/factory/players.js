qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'players').getFullName(), [
		"$rootScope", 
	function($scope) {
		var Player = function() {
			this.colour = "#ccc";
			this.reset = function() {
				angular.forEach(this.programs, function(program) {
					program.resetAbilities();
					program.resetActions();
				});
			};

			this.programs = [];
			this.addProgram = function(program) {
				this.programs.push(program);
			};
		};
		var players = {
			options: {
				Human: function() {
					// Keyboard/mouse controlled
					this.hci = true;
				},
				Simple: function() {
					// AI controlled. AI is simple.
					// Claimers head in whichever direction they have as an option first. Unclaimed blocks are priority. 
					// If no unclaimed blocks exist, do nothing.
					// Offensive units always head straight for enemy.
				},
				Cautious: function() {
					// AI controlled. Claimers avoid player contact.
				},
				Aggressive: function() {
					// AI controlled. Claimers go anywhere they like.
				},
				Intelligent: function() {
					// AI controlled. Units actually work together and adapt to the enemy.
				},
			},
		};
		players.instantiate = function(name) {
			var cls = players.options[name];
			var player = new Player;
			cls.prototype = player;
			cls.prototype.constructor = cls;
			cls.prototype.parent = player;
			var obj = new cls;
			return obj;
		};

		return players;
	}]);
});
