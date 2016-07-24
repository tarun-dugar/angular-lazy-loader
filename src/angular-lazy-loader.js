;(function() {
	var app = angular.module('angular-lazy-loader', [])
	.directive('angularLazyLoad', ['$window', '$timeout', '$rootScope', function($window, $timeout, $rootScope) {
		return {
			restrict: 'EA',

			//child scope instead of isolate scope because need to listen for ng-include load events from other scopes
			scope: true, 
			link: function(scope, element, attrs) {
				var images, 
					videos
					threshold = Number(attrs.threshold) || 0;

				//gets all img(s), iframe(s) with the 'data-src' attribute and changes it to 'src' 
				function getElements() {
					
					//fetch all image elements inside the current element
					images = Array.prototype.slice.call(element[0].querySelectorAll('img[data-src]'));

					//fetch all iframe elements inside the current element
					videos = Array.prototype.slice.call(element[0].querySelectorAll('iframe[data-src]'));

					//if images and videos were found call loadMedia
					if(images.length > 0 || videos.length > 0) {
						loadMedia();
					}
				}

				//checks if element passed in the argument is inside the viewport. Returns a boolean value.
				function inViewPort(media) {
					var coordinates = media.getBoundingClientRect();
					return (
				        	coordinates.bottom + threshold >= 0 &&
				        	coordinates.left >= 0 &&
				        	coordinates.top - threshold <= (window.innerHeight || document.documentElement.clientHeight) &&
				        	coordinates.right <= (window.innerWidth || document.documentElement.clientWidth)
				    	);
				};

				//replaces 'data-src' with 'src' for the elements found.
				function loadMedia() {

					for(var i = images.length - 1; i >= 0; i--) {
						if(inViewPort(images[i])) {
							images[i].src = images[i].getAttribute('data-src');
							images.splice(i, 1);
						}
					}

					for(i = videos.length - 1; i >= 0; i--) {
						if(inViewPort(videos[i])) {
							videos[i].src = videos[i].getAttribute('data-src');
							videos.splice(i, 1);
						}
					}
				};

				getElements();

				//listens for partials loading events using ng-include
				scope.$on('$includeContentLoaded', function(event, url) {
					$timeout(getElements, 0);
				});

				//listens for selective loading, that is, if the developer using this directive wants to load the elements programmatically he can emit a selectiveLoad event
				$rootScope.$on('selectiveLoad', function() {
					$timeout(getElements, 0);
				});

				//calls loadMedia for each window scroll event
				angular.element($window).bind('scroll', function() {
					$timeout(loadMedia, 0);
				});

				//calls loadMedia for each element scroll event
				angular.element(element).bind('scroll', function() {
					$timeout(loadMedia, 0);
				});
			}
		}
	}])
})();
