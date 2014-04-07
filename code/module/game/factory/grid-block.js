qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'grid-block').getFullName(), [
		"$rootScope", 
	function($scope) {
		var Block = function(x,y) {
			this.x = x;
			this.y = y;
			this.ownership; // Somebody might own this block.
			this.program; // There may be a structure on this block.
			this.unit; // There may be a unit on this block.
			this.colour = "#ccc";
			this.unselect = function() {
				this.selected = false;
				//this.borderColour = "initial";
				this.update();
			};
			this.select = function() {
				this.selected = true;
				//this.borderColour = "#ffd";
				this.update();
			};
			//this.unselect();
			
			this.highlight = function() {
				this.highlighted = true;
				//this.borderColour = "#ff0";
				this.update();
			};
			this.unhighlight = function() {
				this.highlighted = false;
				//this.borderColour = "initial";
				this.update();
			};
			this.update = function() {
				this.borderColour = "initial";
				if (this.highlighted) {
					this.borderColour = "#ff0";
				}
				if (this.selected) {
					this.borderColour = "#ffd";
				}
			};
			this.update();
			
			this.getDistance = function(block) {
				return Math.abs(this.x-block.x)+Math.abs(this.y-block.y);
			};
		};
		return Block;
	}]);
});
