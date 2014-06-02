qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'TechItem').getFullName(), [
		"$rootScope", 
	function($scope) {
		return function() {
			var scope = this;
			this.level = 0;
			this.name = "(Unknown Technology)";
			this.max = 1;
			this.parent;
			this.children = [];
			this.setParent = function(tech) {
				tech.addChild(this);
			};
			this.addChild = function(tech) {
				this.children.push(tech);
			};
		};
	}]);
});