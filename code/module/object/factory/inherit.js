qh.component('object', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'inherit').getFullName(), ["$rootScope", function($scope) {
		var obj = {
			extend: function(sup, sub) {
				var superInstance = new sup;
				sub.prototype = superInstance;
				sub.prototype.constructor = sub;
				sub.prototype.parent = superInstance;
				var subInstance = new sub;
				return subInstance;
			},
		};
		return obj;
	}]);
});