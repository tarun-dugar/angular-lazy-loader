(function() {
	var app = angular.module('angular-lazy-loader', [])
	.directive('angularLazyLoad', ['$window', function($window) {
		return {
			restrict: 'A',
			scope : {},
			link: function(scope, element, attrs) {
				var images = Array.prototype.slice.call(element[0].querySelectorAll("img[data-src]"));
				var videos = Array.prototype.slice.call(element[0].querySelectorAll("iframe[data-src]"));
				loadMedia();

				function inViewPort(media) {
					var coordinates = media.getBoundingClientRect();
					return (
				        coordinates.top >= 0 &&
				        coordinates.left >= 0 &&
				        coordinates.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				        coordinates.right <= (window.innerWidth || document.documentElement.clientWidth)
				    )
				};

				function loadMedia() {
					var bool;
					for(var i = images.length - 1; i >= 0; i--) {
						bool = inViewPort(images[i]);
						if(bool) {
							images[i].src = images[i].getAttribute("data-src");
							images.splice(i, 1);
						}
					}
					for(i = videos.length - 1; i >= 0; i--) {
						bool = inViewPort(videos[i]);
						if(bool) {
							videos[i].src = videos[i].getAttribute("data-src");
							videos.splice(i, 1);
						}
					}
				};

				angular.element($window).bind('scroll', function() {
					loadMedia();
				})
			}
		}
	}])
})();
