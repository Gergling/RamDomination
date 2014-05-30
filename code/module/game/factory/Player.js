qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Player').getFullName(), [
		"$rootScope", 
		"game.factory.Capacitor", 
	function($scope, Capacitor) {
		return function() {
			var scope = this;
			this.idx = -1;
			this.colour = "#ccc";
			this.reset = function() {
				angular.forEach(this.programs, function(program) {
					program.resetAbilities();
					program.resetActions();
				});
			};
			this.runAbilities = function() {
				angular.forEach(this.programs, function(program) {
					program.runAbilities();
				});
				this.update();
			};

			this.programs = [];
			this.addProgram = function(program) {
				this.programs.push(program);
			};
			this.runAI = function() {
			};

			this.blocks = [];

			this.memory = 0;
			this.garbageCollector = new Capacitor();
			this.update = function(map) {
				var scope = this;
				this.blocks = [];
				this.map.iterateBlocks(function(block, x, y) {
					if (block.ownership) {
						if (block.ownership.idx===scope.idx) {
							scope.blocks.push(block);
						}
					}
				});
			};
			this.resolveResources = function() {
				var scope = this;
				this.memory = -this.garbageCollector.getCurrent();
				
				// 1 for each block
				angular.forEach(scope.blocks, function(block) {
					scope.memory++;
				});
				
				this.garbageCollector.setMax(scope.memory);
			};
			
			this.garbageCollect = function() {
				// Todo: Calculate change from owned units with garbage collection ability.
				this.garbageCollector.changeCurrent(-1).limit();
			};
		};
	}]);
});
