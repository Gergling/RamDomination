qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Player').getFullName(), [
		"$rootScope", 
	function($scope) {
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

			this.resource = 0;
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
			this.resolveResources = function(map) {
				var scope = this;
				angular.forEach(scope.blocks, function(block) {
					scope.resource++;
				});
			};
		};
	}]);
});
