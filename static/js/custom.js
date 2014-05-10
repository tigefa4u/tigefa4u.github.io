/**
	* @package Emotion
	* @subpackage Emotion HTML
	* @since Emotion HTML 1.0.1
	* 
	* Template Scripts
	* Created by dan_fisher

	Custom JS
	
	1. Revolution Slider
	2. Flexslider Fade
	3. Flexslider Slide
	4. Main Navigation
	5. Tabs (Tabbed Content)
	6. Accordion (Toggle)
	7. Carousel
	8. Isotope
	9. Prettyphoto
	10. Flickr
	-- Misc
	
**/

jQuery(function($){


	/* ----------------------------------------------------------- */
	/*  1. Revolution Slider
	/* ----------------------------------------------------------- */

	var tpj=jQuery;
	tpj.noConflict();

	tpj(document).ready(function() {

	if (tpj.fn.cssOriginal!=undefined)
		tpj.fn.css = tpj.fn.cssOriginal;

		tpj('.banner').revolution({
			delay:6000,
			startheight:360,
			startwidth:940,

			hideThumbs:0,

			navigationType:"bullet",				// bullet, thumb, none
			navigationArrows:"solo",				// nextto, solo, none
			navigationStyle:"custom-square",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item),

			navigationHAlign:"right",				// Horizontal Align left,center,right
			navigationVAlign:"bottom",				// Vertical Align top,center,bottom
			navigationHOffset:0,
			navigationVOffset:0,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:0,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:0,
			soloArrowRightVOffset:0,

			touchenabled:"on",						// Enable Swipe Function : on/off
			onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

			navOffsetHorizontal:0,
			navOffsetVertical:0,

			stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

			hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
			hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
			hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

			shadow:0,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
			fullWidth:"off"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus

		});

	});


	
	/* ----------------------------------------------------------- */
	/*  2. Flexslider Fade
	/* ----------------------------------------------------------- */

	$('.flexslider.fade').flexslider({
		animation: "fade",
		start: function(slider){
			jQuery('#slider').removeClass('loading');
		}
	});



	/* ----------------------------------------------------------- */
	/*  3. Flexslider Slide
	/* ----------------------------------------------------------- */
	jQuery('.flexslider.slide').flexslider({
		animation: "slide",
		start: function(slider){
			jQuery('#slider').removeClass('loading');
		}
	});



	/* ----------------------------------------------------------- */
	/*  4. Main Navigation
	/* ----------------------------------------------------------- */

	$('ul.sf-menu').superfish({
		autoArrows	: true,
		dropShadows : false,
		delay			: 800,
		autoArrows:  false,
		animation	: {opacity:'show', height:'show'},
		speed			: 'fast'
	});

	/* Mobile Menu */
	$('nav.primary .sf-menu').mobileMenu({
		defaultText: 'Navigate to...'
	});



	/* ----------------------------------------------------------- */
	/*  5. Tabs (Tabbed Content)
	/* ----------------------------------------------------------- */

	$(".tabs").each(function(){

		$(this).find(".tab").hide();
		$(this).find(".tab-menu li:first a").addClass("active").show();
		$(this).find(".tab:first").show();

	});

	$(".tabs").each(function(){

		$(this).find(".tab-menu a").click(function() {

			$(this).parent().parent().find("a").removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().parent().parent().find(".tab").hide();
			var activeTab = $(this).attr("href");
			$(activeTab).fadeIn();
			return false;

		});

	});

	

	/* ----------------------------------------------------------- */
	/*  6. Accordion (Toggle)
	/* ----------------------------------------------------------- */

	(function() {
		var $container = $('.acc-body'),
			$acc_head   = $('.acc-head');

		$container.hide();
		$acc_head.first().addClass('active').next().show();
		$acc_head.last().addClass('last');
		
		$acc_head.on('click', function(e) {
			if( $(this).next().is(':hidden') ) {
				$acc_head.removeClass('active').next().slideUp(300);
				$(this).toggleClass('active').next().slideDown(300);
			}
			e.preventDefault();
		});

	})();


	/* ----------------------------------------------------------- */
	/*  7. Carousel
	/* ----------------------------------------------------------- */

	$(function($){
	  $('#carousel').elastislide({
			minItems : 2,
			start : 4
		});
	});



	/* ----------------------------------------------------------- */
	/*  8. Isotope
	/* ----------------------------------------------------------- */

    (function() {

        // modified Isotope methods for gutters in masonry
        $.Isotope.prototype._getMasonryGutterColumns = function() {
            var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
                containerWidth = this.element.width();
          
            this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
                        // or use the size of the first item
                        this.$filteredAtoms.outerWidth(true) ||
                        // if there's no items, use size of container
                        containerWidth;

            this.masonry.columnWidth += gutter;

            this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
            this.masonry.cols = Math.max( this.masonry.cols, 1 );
        };

        $.Isotope.prototype._masonryReset = function() {
            // layout-specific props
            this.masonry = {};
            // FIXME shouldn't have to call this again
            this._getMasonryGutterColumns();
            var i = this.masonry.cols;
            this.masonry.colYs = [];
            while (i--) {
                this.masonry.colYs.push( 0 );
            }
        };

        $.Isotope.prototype._masonryResizeChanged = function() {
            var prevSegments = this.masonry.cols;
            // update cols/rows
            this._getMasonryGutterColumns();
            // return if updated cols/rows is not equal to previous
            return ( this.masonry.cols !== prevSegments );
        };


        // Set Gutter width
        var gutterSize;

        function getWindowWidth() {
            if( $(window).width() < 480 ) {
                gutterSize = 10;
            } else if( $(window).width() < 768 ) {
                gutterSize = 10;
            } else if( $(window).width() < 980 ) {
                gutterSize = 20;
            } else {
                gutterSize = 20;
            }
        }


        // Portfolio settings
        var $container          = $('.project-feed');
        var $filter             = $('.project-feed-filter');

        $(window).smartresize(function(){
            getWindowWidth();
            $container.isotope({
						filter              : '*',
						resizable           : true,
						// set columnWidth to a percentage of container width
						masonry: {
						gutterWidth     : gutterSize
               }
            });
        });

        $container.imagesLoaded( function(){
            $(window).smartresize();
        });

        // Filter items when filter link is clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('current');
            $(this).addClass('current');
            $container.isotope({ 
                filter             : selector,
                animationOptions   : {
                animationDuration  : 750,
                easing             : 'linear',
                queue              : false,
                }
            });
            return false;
        });
       
	})();


	/* ----------------------------------------------------------- */
	/*  9. Prettyphoto
	/* ----------------------------------------------------------- */

	// store the viewport width in a variable
	var viewportWidth = $('body').innerWidth();
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		overlay_gallery: false,
		theme: 'pp_default',
		social_tools: false,
    changepicturecallback: function(){
        // 1024px is presumed here to be the widest mobile device. Adjust at will.
        if (viewportWidth < 1025) {
            $(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
        }
    }
	});

	

	/* ----------------------------------------------------------- */
	/*  10. Flickr
	/* ----------------------------------------------------------- */
	
	$('#flickr').jflickrfeed({
		limit: 16,
		qstrings: {
			id: '52617155@N08'
		},
		itemTemplate: '<li class="thumb"><a rel="prettyPhoto[flickr]" class="flickr-widget_thumb_holder" href="{{image_b}}"><span class="hover"></span><i class="inset-border"></i><i class="icon-search"></i><img src="{{image_s}}" alt="{{title}}" width="72" height="72" /></a></li>'
	}, 
	function(data) {
		$('#flickr a').prettyPhoto({
			overlay_gallery: false,
			theme: 'pp_default',
			social_tools: false
		});
		$("#flickr li:nth-child(4n)").addClass("nomargin");
	});



	/* ----------------------------------------------------------- */
	/*  Misc
	/* ----------------------------------------------------------- */

	//Inset Border For Images
	$(".featured-thumb > a").each(function(){
		$(this).append("<i class='border'></i>");
	});

	//Even class for Old browsers
	$(".ad-holder li:nth-child(even)").addClass("even");
	
});