qh.getModule('sequencer').directive('trackListPatternScrollbar', function() {
	var mod = qh.getQHModule('sequencer');
	return {
		restrict: 'A',
		scope: {},
		templateUrl: qh.getQHModule('sequencer').getPath()+"/partial/scrollbar-horizontal.html",
		controller: [
			"$scope", 
			"$element", 
			"$timeout", 
			"sequencer.factory.bar", 
			"sequencer.factory.track-list-display", 
		function($scope, $element, $timeout, bar, display) {
			// Assume width of element is width of window.
			// Use zoom and offset from bar factory and length from song factory to determine visibility area of song.
			$scope.width = display.length;
			$element.children('.scrollbar').scroll(function(event) {
				console.log('scroll', event.target.scrollLeft);
				bar.view.offset = -event.target.scrollLeft;
				bar.view.update();
				$scope.width = display.length;
				// We have our scroll left.
			});
		}],
	};
});
