qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'players').getFullName(), [
		"$rootScope", 
	function($scope) {
		var Player = function() {
			this.colour = "#ccc";
		};
		var players = {
			options: {
				Human: function() {
					// Keyboard/mouse controlled
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
			var obj = new cls;
			var player = new Player;
			cls.prototype = player;
			cls.prototype.constructor = cls;
			cls.prototype.parent = player;
			return obj;
		};

		return players;
	}]);
});
