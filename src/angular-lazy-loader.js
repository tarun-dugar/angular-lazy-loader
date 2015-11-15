
/*
Lazy loading directive to lazy load images and iframes inside the element to which it is applied.
Works well with single page applications in the sense that it watches for loading of partials using ui-view, ng-include. Future scope includes adding animations. 
*/

(function() {
	var app = angular.module('angular-lazy-loader', [])
	.directive('angularLazyLoad', ['$window', '$timeout', function($window, $timeout) {
		return {
			restrict: 'EA',
			scope: true, //child scope instead of isolate scope because need to listen for ng-include load events from other scopes
			link: function(scope, element, attrs) {
				var images, videos;

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
				        coordinates.top >= 0 &&
				        coordinates.left >= 0 &&
				        coordinates.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				        coordinates.right <= (window.innerWidth || document.documentElement.clientWidth)
				    )
				};

				//replaces 'data-src' with 'src' for the elements found.
				function loadMedia() {
					var bool;
					for(var i = images.length - 1; i >= 0; i--) {
						bool = inViewPort(images[i]);

						//if in viewport replace 'data-src'
						if(bool) {
							images[i].src = images[i].getAttribute('data-src');
							images.splice(i, 1);
						}
					}
					for(i = videos.length - 1; i >= 0; i--) {
						bool = inViewPort(videos[i]);
						if(bool) {
							videos[i].src = videos[i].getAttribute('data-src');
							videos.splice(i, 1);
						}
					}
				};

				getElements();

				//listens for partials loading events using ng-include
				scope.$on('$includeContentLoaded', function(event, url) {
					$timeout(getElements, 0);
				})

				//listens for selective loading, that is, if the developer using this directive wants to load the elements programmatically he can emit a selectiveLoad event
				scope.$on('selectiveLoad', function() {
					$timeout(getElements, 0);
				})

				//calls loadMedia for each scroll event
				angular.element($window).bind('scroll', function() {
					$timeout(loadMedia, 0);
				})
			}
		}
	}])
})();
