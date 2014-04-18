qh.component('game', function(ngm, qhm) {
	ngm.factory(qhm.getComponent('factory', 'help-window').getFullName(), [
		"$rootScope", 
	function($scope) {
		var HelpWindow = function(options) {
			var scope = this;
			this.include = "";
			this.openFunctions = [];
			this.close = false;
			this.navigate = false;
			this.progress = false;
			this.content = {
				header:"",
				content:""
			};
			this.$element;
			this.open = function() {
				angular.forEach(scope.openFunctions, function(fnc) {
					fnc();
				});
			};
			this.close = function() {
				obj.curtainFadeOut(function() {
					
				});
				$element.fadeOut(400, function() {});
			};
				/*$scope.previous = function() {
					bodyCurtain.fadeOut(400, function() {
						bodyCurtain.removeClass('dim');
					});
					$element.fadeOut(400, function() {});
				};
				$scope.next = function() {
					bodyCurtain.fadeOut(400, function() {
						bodyCurtain.removeClass('dim');
					});
					$element.fadeOut(400, function() {});
				};*/

			this.assignControls = function(open, $element) {
				this.openFunctions.push(open);
				this.$element = $element;
			};
			angular.forEach(options, function(option, name) {
				scope[name] = option;
			});
		};
		var partialPath = [qhm.getPath(), "partial", "help-messages"].join("/");
		var obj = {
			list: {
				victory: new HelpWindow({
					include: partialPath+"/victory.html",
					progress: true,
				}),
			},
			assignControls: function(idx, open, $element) {
				var helpWindow = obj.list[idx];
				if (helpWindow) {
					//helpWindow.openFunctions.push(open);
					//helpWindow.$element = $element;
					helpWindow.assignControls(open, $element);
					return helpWindow;
				} else {
					throw "game.factory.helpWindow.assignControls: No HelpWindow for idx '"+idx+"'.";
				}
			},
			getBodyCurtain: function() {
				var curtainId = 'body-curtain';
				if (jQuery('#'+curtainId).length===0) {
					jQuery('<div>').attr('id', curtainId).appendTo(jQuery('body'));
				}
				return jQuery('#'+curtainId);
			},
			curtainFadeIn: function(fnc) {
				var fnc = fnc || function() {};
				bodyCurtain.addClass('dim').fadeIn(400, fnc);
			},
			curtainFadeOut: function(fnc) {
				var fnc = fnc || function() {};
				bodyCurtain.fadeOut(400, function() {
					bodyCurtain.removeClass('dim');
					fnc();
				});
			},
			HelpWindow: HelpWindow,
		};
		var bodyCurtain = obj.getBodyCurtain();
		bodyCurtain.removeClass('dim');

		return obj;
	}]);
});
