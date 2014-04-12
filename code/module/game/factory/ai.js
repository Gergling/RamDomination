qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'ai').getFullName(), [
		"$rootScope", 
	function($scope) {
		var obj = {
			getRandomDestination: function(moveAction) {
				var blocks = moveAction.getOptions();
				var idx = Math.floor(Math.random()*blocks.length);
				return blocks[idx];
			},
		};
		return obj;
	}]);
});
