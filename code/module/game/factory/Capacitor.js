qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'Capacitor').getFullName(), [
		"$rootScope", 
	function($scope) {
		return function() {
			var scope = this;
			this.min = 0;
			this.max = 1;
			this.current = 0;
			this.getScaled = function(min, max) {
				return Math.interpolate(this.current, this.min, this.max, min, max);
			};
			this.getCurrent = function() {
				return this.current;
			};
			this.getMin = function() {
				return this.min;
			};
			this.getMax = function() {
				return this.max;
			};
			this.setCurrent = function(current) {
				var change = current-this.current;
				// Todo: Handle change event
				this.current = current;
				// Todo: Handle overflow event
				// Todo: Handle 'underflow' event
				return this;
			};
			this.setMax = function(max) {
				// Todo: Handle change event
				this.max = max;
				// Todo: Handle overflow event
				// Todo: Handle 'underflow' event
				return this;
			};
			this.changeCurrent = function(change) {
				this.setCurrent(this.current+change);
				return this;
			};
			this.limit = function() {
				if (this.getCurrent()>this.getMax()) {
					// Todo: Handle change event
					this.current = this.max;
				}
				if (this.getCurrent()<this.getMin()) {
					// Todo: Handle change event
					this.current = this.min;
				}
				return this;
			};
		};
	}]);
});
