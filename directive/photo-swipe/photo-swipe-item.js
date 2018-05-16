(function ($application) {
    'use strict'

    var _ = {
        createHyperLink: function (href, size) {
            var $elem = angular.element('<a/>');

            $elem.attr({
                'href': href,
                'data-size': size,
            });

            return $elem;
        },
        createImage: function (src, alt) {
            var $elem = angular.element('<img/>');

            $elem.attr({
                'src': src,
                'alt': alt,
            });

            return $elem;
        },
        createFigureCaption: function (text) {
            var $elem = angular.element('<figcaption/>');

            $elem.text(text);

            return $elem;
        },
    };

    $application.directive('photoSwipeItem', ['$photoSwipeService', function ($photoSwipeService) {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {},
            link: function (scope, element, attrs) {
                var $elem = angular.element(element[0]);
                var $a_elem = _.createHyperLink(attrs.imageOriginHref, attrs.imageOriginSize);
                var $img_elem = _.createImage(attrs.imageThumbnailSrc, attrs.imageAlt);
                var $figure_caption = _.createFigureCaption(attrs.imageDesc);

                $elem
                    .append($a_elem)
                    .append($img_elem)
                    .append($figure_caption)
                    .on('click', function () {
                        $photoSwipeService.openPhoto($elem, attrs);
                    });
            },
            controller: [function () {
            }],
            templateUrl: 'directive/photo-swipe/photo-swipe-item.html',
        };
    }]);

})($application);