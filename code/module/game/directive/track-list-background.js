qh.getModule('sequencer').directive('trackListBackground', function() {
	var mod = qh.getQHModule('sequencer');
	return {
		restrict: 'A',
		scope: {},
		template: $('<div>').html(),
		controller: [
			"$scope", 
			"$element", 
			"$timeout", 
			mod.getComponent('factory', 'track-list-background').getFullName(), 
		function($scope, $element, $timeout, bg) {
			var jqCanvas = bg.jqCanvas;
			var attachCanvas = function() {
				if ($element.parent().width) {
					jqCanvas.attr('width', $element.parent().width());
					jqCanvas.attr('height', $element.parent().height());
					$element.append(jqCanvas);
					bg.update();
				} else {
					console.error("No parent width, had to use timeout. Check jQuery('div.right').", $element.parent().attr('class'), $element.parent().width);
					$timeout(attachCanvas, 100);
				}
			};
			attachCanvas();
		}],
	};
});
