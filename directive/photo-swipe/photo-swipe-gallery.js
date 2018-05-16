(function ($application) {
    'use strict'
    $application.directive('photoSwipeGallery', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {},
            link: function (scope, element, attrs) {
                var $elem = angular.element(element[0]);

                $elem.attr({
                    'class': 'my-gallery',
                    'data-pswp-uid': attrs.pswpId,
                });
            },
            controller: [function () {
            }],
            templateUrl: 'directive/photo-swipe/photo-swipe-gallery.html',
        };
    }]);

})($application);