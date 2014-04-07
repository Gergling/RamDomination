qh.getModule('application').factory("application.factory.uid", [
	"$rootScope", 
function ($rootScope) {
	var obj = {
		uid: 0,
		new: function() {
			var uid = obj.uid;
			obj.uid++;
			return uid;
		},
	};
	return obj;
}]);
