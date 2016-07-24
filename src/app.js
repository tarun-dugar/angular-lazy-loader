var app = angular.module('demoLazyLoader', ['angular-lazy-loader'])
.controller('demoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.load = function() {
		$scope.$emit('selectiveLoad');
	}
}]);