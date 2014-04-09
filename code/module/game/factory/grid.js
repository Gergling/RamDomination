qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'grid').getFullName(), [
		"$rootScope", 
		//"game.factory.maps", 
	function($scope) {
		var obj = {
			iterateBlocks: function(grid, fnc) {
				angular.forEach(grid, function(column, x) {
					angular.forEach(column, function(block, y) {
						if ((block.y || block.y===0) && block.y===(y*1)) {
							fnc(block, x, y);
						}
					});
				});
			},
			unhighlight: function(map) {
				obj.iterateBlocks(map.grid, function(block) {
					block.unhighlight();
				});
			},
			resetClick: function(map) {
				obj.iterateBlocks(map.grid, function(block) {
					block.clickAction = function() {};
				});
			},
			unselect: function(map) {
				obj.iterateBlocks(map.grid, function(block) {
					block.unselect();
				});
			},
			select: function(map, x,y) {
				map.grid[x][y].select();
			},
		};
		return obj;
	}]);
});
