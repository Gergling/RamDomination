qh.getModule('sequencer').directive('trackList', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: qh.getQHModule('sequencer').getPath()+"/partial/track-list.html",
		controller: [
			"$scope", 
			"sequencer.factory.track", 
			"sequencer.factory.bar", 
			"sequencer.factory.pattern", 
		function($scope, track, bar, pattern) {
			$scope.tracks = track.list.list;
			$scope.bars = bar.list;
			$scope.newTrack = track.newTrack;

			$scope.zoom = bar.view;
			$scope.zoomSet = bar.view.set;
			$scope.createPattern = function() {
				var select = $scope.select;
				if (select.on) {
					console.log("===", "Creating", select.trackId, select.bar);
					pattern.newPattern(select.trackId, select.bar.start, select.bar.length);
					track.update();
				}
			};
			$scope.select = {
				trackId: 0,
				setStart: function(trackId, $event) {
					var screenPos = $event.offsetX/$event.currentTarget.offsetWidth;
					var chosenBar = (screenPos*bar.view.zoom)+bar.view.offset;
					// Chosen bar is the time chosen by the click in bars.
					// This will be the starting position for the pattern. The pattern length will be a default if the off-click has already happened.

					$scope.select.trackId = trackId;
					$scope.select.start = $event.offsetX;
					$scope.select.changing = true;
					$scope.select.trackWidth = $event.currentTarget.offsetWidth;
				},
				setChange: function($event) {
					var select = $scope.select;
					if (select.changing) {
						select.end = $event.offsetX;
						select.width = $scope.select.end-$scope.select.start;
						select.bar.update();
					}
				},
				setEnd: function() {
					$scope.select.on = true;
					$scope.select.changing = false;
				},
				bar: {
					start:0,
					length:0,
					update:function() {
						var select = $scope.select;
						select.bar.start = select.bar.getBarPosition(select.start);
						select.bar.length = select.bar.getBarPosition(select.width);
					},
					getBarPosition: function(pixelPosition) {
						var select = $scope.select;
						var screenPos = pixelPosition/select.trackWidth;
						return (screenPos*bar.view.zoom)+bar.view.offset;
					},
					getScreenPosition: function(barPosition) {
						var select = $scope.select;
						//(barPosition-bar.view.offset)/select.trackWidth;
						//var screenPos = pixelPosition/select.trackWidth;
						//return (screenPos*bar.view.zoom)+bar.view.offset;
					},
				},
				start: 0,
				width: 0,
				end: 0,
				trackWidth: 0,
				changing: false,
				on: false,
			};
		}],
	};
});
