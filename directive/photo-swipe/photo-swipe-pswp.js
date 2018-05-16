(function ($application) {
    'use strict'
    $application.directive('photoSwipePswp', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope, element, attrs) {
            },
            controller: [function () {
            }],
            templateUrl: 'directive/photo-swipe/photo-swipe-pswp.html',
        };
    }]);

})($application);