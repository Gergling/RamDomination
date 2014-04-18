qh.component('game', function(ngm, qhm) {
	ngm.directive('helpWindow', function() {
		return {
			restrict: 'A',
			scope: {idx:'@', collection:'@'},
			templateUrl: qhm.getPath()+"/partial/help-window.html",
			controller: [
				"$scope", 
				"$element", 
				"$attrs", 
				"game.factory.help-window", 
				"game.factory.maps", 
			function($scope, $element, $attrs, help, maps) {
				// Close/open functions
				var bodyCurtain = help.getBodyCurtain();
				$element.hide().addClass('help-window').addClass('modal');

				$scope.message = "";
				// Consider including partials instead
				var fadeIn = function() {
					help.curtainFadeIn();
					$element.fadeIn(400);
				};

				$scope.$watch('$attrs.idx', function() {
					if ($attrs.idx) {
						var helpWindow = help.assignControls($attrs.idx, function() {
							help.curtainFadeIn();
							$element.fadeIn(400);
						}, $element);
						$scope.helpWindow = helpWindow;
					}
					
					// Testing:
					//helpWindow.open();
				});

				$scope.$watch('$attrs.level', function() {
					// Get the current map. Get the appropriate collection of help windows.
					var map = maps.getChosen();
					map.intro[0].assignControls(fadeIn, $element);
					$scope.helpWindow = map.intro[0];
					
					// Testing:
					$scope.helpWindow.open();
				});
				
				$scope.close = function() {
					bodyCurtain.fadeOut(400, function() {
						bodyCurtain.removeClass('dim');
					});
					$element.fadeOut(400, function() {});
				};
				$scope.previous = function() {
					$scope.helpWindow = $scope.helpWindow.previous;
				};
				$scope.next = function() {
					$scope.helpWindow = $scope.helpWindow.next;
				};
			}],
		};
	});
});
