(function ($application) {
    'use strict'

    var _ = {
        parseThumbnailElements: function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes 
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        },
        closest: function closest(el, fn) {
            return el && (fn(el) ? el : _.closest(el.parentNode, fn));
        },
    };

    $application.service('$photoSwipeService', [function () {
        var service = {
            openPhoto: function ($elem, attrs) {
                var pswpElement = document.querySelector('.pswp');
                var $galleryElement = $elem.closest('.my-gallery');
                var items = _.parseThumbnailElements($galleryElement[0]);
                var options = {
                    // define gallery index (for URL)
                    galleryUID: $galleryElement[0].getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function (index) {
                        // See Options -> getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                    }

                };
                $galleryElement.children().each(function (i, node) {
                    if (angular.element(node).is($elem)) {
                        options.index = i;
                    }
                })
                new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options).init();
            },
        };

        return service;
    }]);
})($application);