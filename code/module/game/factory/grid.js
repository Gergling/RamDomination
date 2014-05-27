qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'grid').getFullName(), [
		"$rootScope", 
		//"game.factory.maps", 
	function($scope) {
		var obj = {
			iterateBlocks: function(grid, fnc) {
				console.error("Deprecated function game.factory.grid.iterateBlocks");
				angular.forEach(grid, function(column, x) {
					angular.forEach(column, function(block, y) {
						if ((block.y || block.y===0) && block.y===(y*1)) {
							fnc(block, x, y);
						}
					});
				});
			},
			unhighlight: function(map) {
				console.error("Deprecate function game.factory.grid.unhighlight: use from map object.");
				obj.iterateBlocks(map.grid, function(block) {
					block.unhighlight();
				});
			},
			resetClick: function(map) {
				console.error("Deprecate function game.factory.grid.resetClick: use from map object.");
				obj.iterateBlocks(map.grid, function(block) {
					block.clickAction = function() {};
				});
			},
			unselect: function(map) {
				console.error("Deprecate function game.factory.grid.unselect: use from map object.");
				obj.iterateBlocks(map.grid, function(block) {
					block.unselect();
				});
			},
			select: function(map, x,y) {
				console.error("Deprecate function game.factory.grid.resetClick: use from block object.");
				map.grid[x][y].select();
			},
			setBlock: function(grid, block, override) {
				console.error("Deprecate function game.factory.grid.resetClick: use from map object.");
				var x = block.x;
				var y = block.y;
				if (!grid[x]) {grid[x] = {};}
				if (!grid[x][y] || override) {
					grid[x][y] = block;
				}
			},
			/*text: {
				update: function() {
					angular.forEach(["select", "hover"], function(property) {
						angular.forEach(obj.text[property], function(text) {
							text.value = block[text.name];
						});
					});
				},
			},*/
			block: {
				hover: null,
				select: null,
			},
			//$scope.selectedBlock = {};
		};
		/*angular.forEach(["select", "hover"], function(property) {
			obj.text[property] = {
				x:{name:"x", label:"X"},
				y:{name:"y", label:"Y"},
				ownership:{name:"ownership", label:"Ownership"},
				structure:{name:"structure", label:"Structure"},
				unit:{name:"unit", label:"Unit"},
			};
		});*/
		return obj;
	}]);
});
