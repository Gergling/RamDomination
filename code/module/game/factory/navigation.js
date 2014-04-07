qh.component('sequencer', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'navigation').getFullName(), [
		"$rootScope", 
	function($scope) {
		var obj = {
			action:"",
		};
		return obj;
	}]);
});
