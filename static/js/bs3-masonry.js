// |--------------------------------------------------------------------------
// | BS3 masonry
// |--------------------------------------------------------------------------
// |
// | Should be used alongside with Masonry:
// | - http://masonry.desandro.com/
// |
// | This jQuery script is written by
// | Morten Nissen
// |

var bs3Masonry = (function ($) {
    'use strict';

    var Modernizr = {};
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function () {
        registerBootEventHandlers();
        registerEventHandlers();
    }

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        applyMasonry();
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {

        $('.bs3-masonry-wrapper').resize(function () {
            applyMasonry();
        });

        $(window).resize(function () {
            applyMasonry();
        });
    }

    /**
     * Apply Masonry
     */
    function applyMasonry() {
        var $wrapper = $('.bs3-masonry-wrapper');

        $wrapper.imagesLoaded(function () {

            $wrapper.masonry({
                itemSelector: '.bs3-masonry-item'
            });
        });
    }

    return pub;
})(jQuery);
