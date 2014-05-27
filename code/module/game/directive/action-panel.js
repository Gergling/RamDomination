qh.component('game', function(ngm, qhm) {
	ngm.directive('actionPanel', function() {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: qhm.getPath()+"/partial/action-panel.html",
			controller: [
				"$scope", 
				"game.factory.maps", 
				"game.factory.grid", 
			function($scope, maps, grid) {
				var Nav = function(name, label, icon) {
					this.name = name;
					this.label = label;
					this.icon = icon;
					this.active = false;
					this.select = function() {
						unselect();
						this.active = true;
						$scope.content = this.name;
					};
				};
				$scope.navs = [
					new Nav("misc", "Misc", "glyphicon-question-sign"),
					new Nav("static", "Static", "glyphicon-tower"),
					new Nav("program", "Program", "glyphicon-qrcode"),
				];
				$scope.content = "";
				var unselect = function() {
					angular.forEach($scope.navs, function(nav) {
						nav.active = false;
					});
				};
				$scope.navs[0].select();
				
				$scope.map = maps.getChosen();
				$scope.grid = grid;
			}],
		};
	});
});
