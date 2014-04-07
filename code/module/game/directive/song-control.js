qh.getModule('sequencer').directive('songControl', function() {
	var mod = qh.getQHModule('sequencer');
	return {
		restrict: 'A',
		scope: {},
		templateUrl: mod.getPath()+"/partial/song-control.html",
		controller: [
			"$scope", 
			mod.getComponent('factory', 'song').getFullName(), 
		function($scope, song) {
			$scope.label = song.name;
		}],
	};
});
