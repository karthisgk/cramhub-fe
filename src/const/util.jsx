export const util = {
    uniqueid: function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4();
  }
};

export const youtube_parser = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
};

export const getUrlParams = (param, murl = '') => {
    var url = new URL(murl == '' ? window.location.href : murl);
    var c = url.searchParams.get(param);
    return c;
}

export const validatePassword = function (values) {
  const errors = {};

  if (values.New_Password !== values.Confirm_Password) {
      errors.Confirm_Password = "Confirm Password does not match"
  }

  if (values.New_Password) {
      if (values.New_Password.length < 8) {
          errors.New_Password = "Minimum it should have 8 characters"
      }
  }
  return errors;
};

export const validatePasswordSignup = function (values) {
    const errors = {};
  
    if (values.password !== values.cpassword) {
        errors.cpassword = "Confirm Password does not match"
    }
  
    if (values.password) {
        if (values.password.length < 8) {
            errors.password = "Minimum it should have 8 characters"
        }
    }
    return errors;
};

export const googleApiKey = 'AIzaSyD_-_yFaAEpXjGH851iTlKLA3XZaesRk58';

export const getHashTagFromInput = (input, pos) => {
    var caption = input.slice(0, pos);
    var captionArray = caption.split('#');
    var hashPosition = captionArray.length - 1;
    var withSpace = captionArray[hashPosition].split(' ');
    caption = withSpace.length > 0 ? withSpace[0] : captionArray[hashPosition];

    var atCaption = input.slice(0, pos);
    var atArray = atCaption.split('@');
    var atPosition = atArray.length - 1;
    var atWithSpace = atArray[atPosition].split(' ');
    atCaption = atWithSpace.length > 0 ? atWithSpace[0] : atArray[atPosition];
    return captionArray[hashPosition].split('@').length > 1 ? '@' + atCaption : '#' + caption;
};

export const replaceHashTagInCaption = (caption, hashTag, pos) => {
    var temp = caption.slice(pos);
    caption = caption.slice(0, pos);
    var delimeter = hashTag.slice(0,1);
    var captionArray = caption.split(delimeter);
    var withSpace = captionArray[captionArray.length - 1];
    return caption.replace( new RegExp(delimeter + withSpace+'$'), hashTag) + temp;
}

export const getQueryStringValue = function(key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
};

export const getRootUrl = function(){
    return "http://cramapi.karthisgk.be/";
};

export const getFrontUrl = function(){
	return location.protocol + '//' + location.host + '/';
};

export const webSocket = require('socket.io-client')(getRootUrl());

export const baseInit = function() {

	/* -----------------------
	* Progress bars Animation
	* --------------------- */

	$(document).ready(function () {
		var $progress_bar = $('.skills-item');

		$progress_bar.each(function () {
			$progress_bar.appear({force_process: true});
			$progress_bar.on('appear', function () {
				var current_bar = $(this);
				if (!current_bar.data('inited')) {
					current_bar.find('.skills-item-meter-active').fadeTo(300, 1).addClass('skills-animate');
					current_bar.data('inited', true);
				}
			});
		});
	});
	/* -----------------------
	* Fixed Header
	* --------------------- */


	$(document).ready(function () {
		var $header = $('#header--standard');

		if ($header.length) {
			$header.headroom(
				{
					"offset": 100,
					"tolerance": 5,
					"classes": {
						"initial": "animated",
						"pinned": "slideDown",
						"unpinned": "slideUp"
					}
				}
			);
		}
	});

	/* -----------------------
	* COUNTER NUMBERS
	* --------------------- */


	$(document).ready(function () {
		var $counter = $('.counter');

		if ($counter.length) {
			$counter.each(function () {
				jQuery(this).waypoint(function () {
					$(this.element).find('span').countTo();
					this.destroy();
				}, {offset: '95%'});
			});
		}
	});
	//Global var to avoid any conflicts
	var CRUMINA = {};

	window.initEvent = function($) {

		// USE STRICT
		"use strict";

		//----------------------------------------------------/
		// Predefined Variables
		//----------------------------------------------------/
		var $window = $(window),
			$document = $(document),
			$body = $('body'),
			$sidebar = $('.fixed-sidebar'),
			$preloader = $('#hellopreloader');

		/* -----------------------
		* Preloader
		* --------------------- */

		CRUMINA.preloader = function () {
			$window.scrollTop(0);
			setTimeout(function () {
				$preloader.fadeOut(800);
			}, 500);
			return false;
		};

		//Scroll to top.
			jQuery('.back-to-top').on('click', function () {
				$('html,body').animate({
					scrollTop: 0
				}, 1200);
				return false;
			});


		/* -----------------------
		* Input Number Quantity
		* --------------------- */

		$(document).on("click",".quantity-plus",function(){
			var val = parseInt($(this).prev('input').val());
			$(this).prev('input').val(val + 1).change();
			return false;
		});

		$(document).on("click",".quantity-minus",function(){
			var val = parseInt($(this).next('input').val());
			if (val !== 1) {
				$(this).next('input').val(val - 1).change();
			}
			return false;
		});


		/* -----------------------------
		Custom input type="number"
		https://bootsnipp.com/snippets/featured/bootstrap-number-spinner-on-click-hold
		* ---------------------------*/

		$(function () {
			var action;
			$(document).on("touchstart mousedown",".number-spinner button",function(){
				var btn = $(this);
				var input = btn.closest('.number-spinner').find('input');
				btn.closest('.number-spinner').find('button').prop("disabled", false);

				if (btn.attr('data-dir') == 'up') {
					action = setInterval(function () {
						if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
							input.val(parseInt(input.val()) + 1);
						} else {
							btn.prop("disabled", true);
							clearInterval(action);
						}
					}, 50);
				} else {
					action = setInterval(function () {
						if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
							input.val(parseInt(input.val()) - 1);
						} else {
							btn.prop("disabled", true);
							clearInterval(action);
						}
					}, 50);
				}
			});
			$(document).on("touchend mouseup",".number-spinner button",function() {
				clearInterval(action);
			});
		});

		/* -----------------------------
		* Toggle functions
		* ---------------------------*/

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var target = $(e.target).attr("href"); // activated tab
			if('#events' === target){
				$('.fc-state-active').click();
			}
		});

		// Toggle aside panels
		$(".js-sidebar-open").on('click', function () {
			var mobileWidthApp = $('body').outerWidth();
			if(mobileWidthApp <= 560) {
				$(this).closest('body').find('.popup-chat-responsive').removeClass('open-chat');
			}

			$(this).toggleClass('active');
			$(this).closest($sidebar).toggleClass('open');		
			return false;
		});

		// Close on "Esc" click
		$window.keydown(function (eventObject) {
			if (eventObject.which == 27 && $sidebar.is(':visible')) {
				$sidebar.removeClass('open');
			}
		});

		// Close on click outside elements.
		$document.on('click', function (event) {
			if (!$(event.target).closest($sidebar).length && $sidebar.is(':visible')) {
				$sidebar.removeClass('open');
			}
		});

		// Toggle inline popups

		var $popup = $('.window-popup');

		$(".js-open-popup").on('click', function (event) {
			var target_popup = $(this).data('popup-target');
			var current_popup = $popup.filter(target_popup);
			var offset = $(this).offset();
			current_popup.addClass('open');
			current_popup.css('top', (offset.top - (current_popup.innerHeight() / 2)));
			$body.addClass('overlay-enable');
			return false;
		});

		// Close on "Esc" click
		$window.keydown(function (eventObject) {
			if (eventObject.which == 27) {
				$popup.removeClass('open');
				$body.removeClass('overlay-enable');
				$('.profile-menu').removeClass('expanded-menu');
				$('.popup-chat-responsive').removeClass('open-chat');
				$('.profile-settings-responsive').removeClass('open');
				$('.header-menu').removeClass('open');
			}
		});

		// Close on click outside elements.
		$document.on('click', function (event) {
			if (!$(event.target).closest($popup).length) {
				$popup.removeClass('open');
				$body.removeClass('overlay-enable');
				$('.profile-menu').removeClass('expanded-menu');
				$('.header-menu').removeClass('open');
				$('.profile-settings-responsive').removeClass('open');
			}
		});

		// Close active tab on second click.
		$('[data-toggle=tab]').on('click', function(){
			/*$body.toggleClass('body--fixed');*/
			if ($(this).hasClass('active') && $(this).closest('ul').hasClass('mobile-app-tabs')){
				$($(this).attr("href")).toggleClass('active');
				$(this).removeClass('active');
				return false;
			}
		});


		// Close on "X" click
		$(".js-close-popup").on('click', function () {
			$(this).closest($popup).removeClass('open');
			$body.removeClass('overlay-enable');
			return false
		});

		$(".profile-settings-open").on('click', function () {
			$('.profile-settings-responsive').toggleClass('open');
			return false
		});

		$(".js-expanded-menu").on('click', function () {
			$('.header-menu').toggleClass('expanded-menu');
			return false
		});

		$(".js-chat-open").on('click', function () {
			$('.popup-chat-responsive').toggleClass('open-chat');
			return false
		});
		$(".js-chat-close").on('click', function () {
			$('.popup-chat-responsive').removeClass('open-chat');
			return false
		});

		$(".js-open-responsive-menu").on('click', function () {
			$('.header-menu').toggleClass('open');
			return false
		});

		$(".js-close-responsive-menu").on('click', function () {
			$('.header-menu').removeClass('open');
			return false
		});


		/* -----------------------------
			* Scrollmagic scenes animation
		* ---------------------------*/

		CRUMINA.CallToActionAnimation = function () {
			var controller = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: ".call-to-action-animation"})
				.setVelocity(".first-img", {opacity: 1, bottom: "0", scale: "1"}, 1200)
				.triggerHook(1)
				.addTo(controller);

			new ScrollMagic.Scene({triggerElement: ".call-to-action-animation"})
				.setVelocity(".second-img", {opacity: 1, bottom: "50%", right: "40%"}, 1500)
				.triggerHook(1)
				.addTo(controller);
		};

		CRUMINA.ImgScaleAnimation = function () {
			var controller = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: ".img-scale-animation"})
				.setVelocity(".main-img", {opacity: 1, scale: "1"}, 200)
				.triggerHook(0.3)
				.addTo(controller);

			new ScrollMagic.Scene({triggerElement: ".img-scale-animation"})
				.setVelocity(".first-img1", {opacity: 1, scale: "1"}, 1200)
				.triggerHook(0.8)
				.addTo(controller);

			new ScrollMagic.Scene({triggerElement: ".img-scale-animation"})
				.setVelocity(".second-img1", {opacity: 1, scale: "1"}, 1200)
				.triggerHook(1.1)
				.addTo(controller);

			new ScrollMagic.Scene({triggerElement: ".img-scale-animation"})
				.setVelocity(".third-img1", {opacity: 1, scale: "1"}, 1200)
				.triggerHook(1.4)
				.addTo(controller);
		};

		CRUMINA.SubscribeAnimation = function () {
			var controller = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: ".subscribe-animation"})
				.setVelocity(".plane", {opacity: 1, bottom: "auto", top: "-20", left: "50%", scale: "1"}, 1200)
				.triggerHook(1)
				.addTo(controller);

		};

		CRUMINA.PlanerAnimation = function () {
			var controller = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: ".planer-animation"})
				.setVelocity(".planer", {opacity: 1, left: "80%", scale: "1"}, 2000)
				.triggerHook(0.1)
				.addTo(controller);

		};

		CRUMINA.ContactAnimationAnimation = function () {
			var controller = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: ".contact-form-animation"})
				.setVelocity(".crew", {opacity: 1, left: "77%", scale: "1"}, 1000)
				.triggerHook(0.1)
				.addTo(controller);
		};

		CRUMINA.perfectScrollbarInit = function () {
			var $chatContainer = $('.popup-chat-responsive .mCustomScrollbar');
			var $containers = $('.mCustomScrollbar');

			$containers.perfectScrollbar({wheelPropagation:false});

			if(!$chatContainer.length){
				return;
			}

			$chatContainer.scrollTop( $chatContainer.prop( "scrollHeight" ) );
			$chatContainer.perfectScrollbar('update');
		};


		/* -----------------------------
	* Responsive
	* ---------------------------*/
		CRUMINA.responsive = {
			$profilePanel: null,
			$desktopContainerPanel: null,
			$responsiveContainerPanel: null,
			init: function () {
				this.$profilePanel = jQuery('#profile-panel');
				this.$desktopContainerPanel = jQuery('#desktop-container-panel > .ui-block');
				this.$responsiveContainerPanel = jQuery('#responsive-container-panel .ui-block');
				this.update();
			},
			mixPanel: function () {
				if (window.matchMedia("(max-width: 1024px)").matches) {
					this.$responsiveContainerPanel.append(this.$profilePanel);

				} else {
					this.$desktopContainerPanel.append(this.$profilePanel);
				}
			},
			update: function () {
				var _this = this;
				var resizeTimer = null;
				var resize = function () {
					resizeTimer = null;

					// Methods
					_this.mixPanel();
				};

				$(window).on('resize', function () {
					if (resizeTimer === null) {
						resizeTimer = window.setTimeout(function () {
							resize();
						}, 300);
					}
				}).resize();
			}
		};

		/* -----------------------------
		* On DOM ready functions
		* ---------------------------*/

		$document.ready(function () {

			CRUMINA.preloader();

			CRUMINA.perfectScrollbarInit();

			// Row background animation
			if ($('.call-to-action-animation').length) {
				CRUMINA.CallToActionAnimation();
			}

			if ($('.img-scale-animation').length) {
				CRUMINA.ImgScaleAnimation()
			}

			if ($('.subscribe-animation').length) {
				CRUMINA.SubscribeAnimation()
			}

			if ($('.planer-animation').length) {
				CRUMINA.PlanerAnimation()
			}

			if ($('.contact-form-animation').length) {
				CRUMINA.ContactAnimationAnimation()
			}

			// Run scripts only if they included on page.

			if (typeof $.fn.gifplayer !== 'undefined'){
				$('.gif-play-image').gifplayer();
			}
			if (typeof $.fn.mediaelementplayer !== 'undefined'){
				$('#mediaplayer').mediaelementplayer({
					"features": ['prevtrack', 'playpause', 'nexttrack', 'loop', 'shuffle', 'current', 'progress', 'duration', 'volume']
				});
			}

			CRUMINA.responsive.init();

		});
	};
	/* -----------------------------
		* Material design js effects
		* Script file: material.min.js
		* Documentation about used plugin:
		* http://demos.creative-tim.com/material-kit/components-documentation.html
		* ---------------------------*/


	CRUMINA.Materialize = function () {
		$.material.init();

		$('.checkbox > label').on('click', function () {
			$(this).closest('.checkbox').addClass('clicked');
		})
	};

	$(document).ready(function () {
		CRUMINA.Materialize();
	});


	/* -----------------------------
		* Forms validation added Errors Messages
	* ---------------------------*/

	CRUMINA.FormValidation = function () {
		$('.needs-validation').each(function () {
			var form = $(this)[0];
			form.addEventListener("submit", function (event) {
				if (form.checkValidity() == false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add("was-validated");
			}, false);
		});
	};

	$(document).ready(function () {
		CRUMINA.FormValidation();
	});
	/* -----------------------------
		* Bootstrap components init
		* Script file: theme-plugins.js, tether.min.js
		* Documentation about used plugin:
		* https://v4-alpha.getbootstrap.com/getting-started/introduction/
		* ---------------------------*/


	CRUMINA.Bootstrap = function () {
		//  Activate the Tooltips
		$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

		// And Popovers
		$('[data-toggle="popover"]').popover();

		/* -----------------------------
		* Replace select tags with bootstrap dropdowns
		* Script file: theme-plugins.js
		* Documentation about used plugin:
		* https://silviomoreto.github.io/bootstrap-select/
		* ---------------------------*/
		$('.selectpicker').selectpicker();

		/* -----------------------------
		* Date time picker input field
		* Script file: daterangepicker.min.js, moment.min.js
		* Documentation about used plugin:
		* https://v4-alpha.getbootstrap.com/getting-started/introduction/
		* ---------------------------*/
		var date_select_field = $('input[name="datetimepicker"]');
		/*moment.locale('uk');*/
		if (date_select_field.length) {
			var start = moment().subtract(29, 'days');

			date_select_field.daterangepicker({
				startDate: start,
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				locale: {
					format: 'DD/MM/YYYY'
				}
			});
			date_select_field.on('focus', function () {
				$(this).closest('.form-group').addClass('is-focused');
			});
			date_select_field.on('apply.daterangepicker', function (ev, picker) {
				$(this).val(picker.startDate.format('DD/MM/YYYY'));
				$(this).closest('.form-group').addClass('is-focused');
			});
			date_select_field.on('hide.daterangepicker', function () {
				if ('' === $(this).val()){
					$(this).closest('.form-group').removeClass('is-focused');
				}
			});

		}
	};

	$(document).ready(function () {
		CRUMINA.Bootstrap();
	});
	/* -----------------------------
	* Top Search bar function
	* Script file: selectize.min.js
	* Documentation about used plugin:
	* https://github.com/selectize/selectize.js
	* ---------------------------*/

	var searchFieldKeyup = function(query, callback) {
		var caption = query;
		if(/(^|\s)(#[a-z\d-]+)/ig.test(caption) || /(^|\s)(@[a-z\d-]+)/ig.test(caption)){
			$.ajax({
				type: 'post',
				url: window.RooTUrl + 'gethashtags?type=1&offset=0&limit=20&search=true',
				data: {searchText: caption},
				dataType: 'json',
				success: (data) => {
					const { code } = data;
					var hashTags = data.data;
					var gResult = [];
					hashTags.forEach(hashTag => {
						var returnObject = {
							name: hashTag.name ? hashTag.name : hashTag,
							image: hashTag.avatar ? hashTag.avatar : '',
							message: hashTag.message ? hashTag.message : ''
						};
						gResult.push(returnObject);
					});
					callback(gResult);
				}
			})
		}
	};

	function initSelectize(topUserSearch, result, init = false) {
		if (topUserSearch.length) {
			if(topUserSearch[0].selectize)
				topUserSearch[0].selectize.destroy();
			if(result.length == 0 && !init)
				return;

			var gResult = [];
			result.forEach(hashTag => {
				//{image: 'img/avatar30-sm.jpg', name: 'Marie Claire Stevens', message:'12 Friends in Common', icon:'olymp-happy-face-icon'};
				var returnObject = {
					name: hashTag.name ? hashTag.name : hashTag,
					image: hashTag.avatar ? hashTag.avatar : '',
					message: hashTag.message ? hashTag.message : ''
				};
				gResult.push(returnObject);
			});

			topUserSearch.selectize({
				delimiter: ',',
				persist: false,
				maxItems: 2,
				valueField: 'name',
				labelField: 'name',
				searchField: ['name'],
				options: gResult,
				render: {
					option: function(item, escape) {
						var isHashTag = /^#/ig.test(item.name);
						return '<div class="inline-items">' +
							(!isHashTag ? '<div class="author-thumb"><img src="' + (item.image ? escape(item.image) : window.FrontUrl + 'src/assets/img/author-page.jpg') + '" alt="avatar"></div>' : '') +
							'<div class="notification-event">' +
							(item.name ? '<span class="h6 notification-friend"></a>' + escape(item.name) + '</span>' : '') +
							(item.message ? '<span class="chat-message-item">' + escape(item.message) + '</span>' : '') +
							'</div>';
					},
					item: function(item, escape) {
						location.href = window.FrontUrl + (/^@/ig.test(item.name) ? "page?u=" : "page?h=") + item.name.replace(/^[#@]/ig, '');
						var label = item.name;
						return '<div>' +
							'<span class="label">' + escape(label) + '</span>' +
							'</div>';
					}
				},
				load: searchFieldKeyup,
				create: searchFieldKeyup
			});
		}
	}

	window.searchFieldInitialze = function() {	
		window.RooTUrl = getRootUrl();
		window.FrontUrl = getFrontUrl();
		initSelectize($('.js-user-search'), [], true);
		$('.js-user-search').keyup(function(event){
			if(event.keyCode == 13)
				location.href = window.FrontUrl + '?q=' + event.target.value;
		});
		initEvent($);
	};

	/* -----------------------------
		* Sliders and Carousels
		* Script file: swiper.jquery.min.js
		* Documentation about used plugin:
		* http://idangero.us/swiper/api/
		* ---------------------------*/


	var swipers = {};

	$(document).ready(function () {
		searchFieldInitialze();
		var initIterator = 0;
		var $breakPoints = false;
		$('.swiper-container').each(function () {

			var $t = $(this);
			var index = 'swiper-unique-id-' + initIterator;

			$t.addClass('swiper-' + index + ' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('pagination-' + index);

			var $effect = ($t.data('effect')) ? $t.data('effect') : 'slide',
				$crossfade = ($t.data('crossfade')) ? $t.data('crossfade') : true,
				$loop = ($t.data('loop') == false) ? $t.data('loop') : true,
				$showItems = ($t.data('show-items')) ? $t.data('show-items') : 1,
				$scrollItems = ($t.data('scroll-items')) ? $t.data('scroll-items') : 1,
				$scrollDirection = ($t.data('direction')) ? $t.data('direction') : 'horizontal',
				$mouseScroll = ($t.data('mouse-scroll')) ? $t.data('mouse-scroll') : false,
				$autoplay = ($t.data('autoplay')) ? parseInt($t.data('autoplay'), 10) : 0,
				$autoheight = ($t.hasClass('auto-height')) ? true: false,
				$slidesSpace = ($showItems > 1) ? 20 : 0;

			if ($showItems > 1) {
				$breakPoints = {
					480: {
						slidesPerView: 1,
						slidesPerGroup: 1
					},
					768: {
						slidesPerView: 2,
						slidesPerGroup: 2
					}
				}
			}

			swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
				pagination: '.pagination-' + index,
				paginationClickable: true,
				direction: $scrollDirection,
				mousewheelControl: $mouseScroll,
				mousewheelReleaseOnEdges: $mouseScroll,
				slidesPerView: $showItems,
				slidesPerGroup: $scrollItems,
				spaceBetween: $slidesSpace,
				keyboardControl: true,
				setWrapperSize: true,
				preloadImages: true,
				updateOnImagesReady: true,
				autoplay: $autoplay,
				autoHeight: $autoheight,
				loop: $loop,
				breakpoints: $breakPoints,
				effect: $effect,
				fade: {
					crossFade: $crossfade
				},
				parallax: true,
				onSlideChangeStart: function (swiper) {
					var sliderThumbs = $t.siblings('.slider-slides');
					if (sliderThumbs.length) {
						sliderThumbs.find('.slide-active').removeClass('slide-active');
						var realIndex = swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index');
						sliderThumbs.find('.slides-item').eq(realIndex).addClass('slide-active');
					}
				}
			});
			initIterator++;
		});


		//swiper arrows
		$('.btn-prev').on('click', function () {
			var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
			swipers['swiper-' + sliderID].slidePrev();
		});

		$('.btn-next').on('click', function () {
			var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
			swipers['swiper-' + sliderID].slideNext();
		});

		//swiper arrows
		$('.btn-prev-without').on('click', function () {
			var sliderID = $(this).closest('.swiper-container').attr('id');
			swipers['swiper-' + sliderID].slidePrev();
		});

		$('.btn-next-without').on('click', function () {
			var sliderID = $(this).closest('.swiper-container').attr('id');
			swipers['swiper-' + sliderID].slideNext();
		});


		// Click on thumbs
		$('.slider-slides .slides-item').on('click', function () {
			if ($(this).hasClass('slide-active')) return false;
			var activeIndex = $(this).parent().find('.slides-item').index(this);
			var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
			swipers['swiper-' + sliderID].slideTo(activeIndex + 1);
			$(this).parent().find('.slide-active').removeClass('slide-active');
			$(this).addClass('slide-active');

			return false;
		});

	});

	/* -----------------------------
		* Isotope sorting
	* ---------------------------*/

	CRUMINA.IsotopeSort = function () {
		var $containerSort = $('.sorting-container');
		$containerSort.each(function () {
			var $current = $(this);
			var layout = ($current.data('layout').length) ? $current.data('layout') : 'masonry';
			$current.isotope({
				itemSelector: '.sorting-item',
				layoutMode: layout,
				percentPosition: true
			});

			$current.imagesLoaded().progress(function () {
				$current.isotope('layout');
			});

			var $sorting_buttons = $current.siblings('.sorting-menu').find('li');

			$sorting_buttons.on('click', function () {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var filterValue = $(this).data('filter');
				if (typeof filterValue != "undefined") {
					$current.isotope({filter: filterValue});
					return false;
				}
			});
		});
	};

	$(document).ready(function () {
		CRUMINA.IsotopeSort();
	});

	/* -----------------------------
		* Lightbox popups for media
		* Script file: jquery.magnific-popup.min.js
		* Documentation about used plugin:
		* http://dimsemenov.com/plugins/magnific-popup/documentation.html
		* ---------------------------*/


	CRUMINA.mediaPopups = function () {
		$('.play-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
		$('.js-zoom-image').magnificPopup({
			type: 'image',
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = 'mfp-zoom-in';
				}
			},
			closeOnContentClick: true,
			midClick: true
		});
		$('.js-zoom-gallery').each(function () {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true
				},
				removalDelay: 500, //delay removal by X to allow out-animation
				callbacks: {
					beforeOpen: function () {
						// just a hack that adds mfp-anim class to markup
						this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
						this.st.mainClass = 'mfp-zoom-in';
					}
				},
				closeOnContentClick: true,
				midClick: true
			});
		});
	};

	$(document).ready(function () {

		if (typeof $.fn.magnificPopup !== 'undefined'){
			CRUMINA.mediaPopups();
		}
	});

	CRUMINA.StickySidebar = function () {
		var $header = $('#site-header');

		$('.crumina-sticky-sidebar').each(function () {

		var sidebar = new StickySidebar (this, {
			topSpacing: $header.height(),
			bottomSpacing: 0,
			containerSelector: false,
			innerWrapperSelector: '.sidebar__inner',
			resizeSensor: true,
			stickyClass: 'is-affixed',
			minWidth: 0
			})
		});
	};

	$(document).ready(function () {
		CRUMINA.StickySidebar();
	});
	// Ion.RangeSlider
	// version 2.2.0 Build: 380
	// © Denis Ineshin, 2017
	// https://github.com/IonDen
	//
	// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
	// GitHub page:     https://github.com/IonDen/ion.rangeSlider
	//
	// Released under MIT licence:
	// http://ionden.com/a/plugins/licence-en.html

	CRUMINA.rangeSlider = function () {
		$(".range-slider-js").ionRangeSlider({
				type: "double",
				grid: true,
				min: 0,
				max: 1000,
				from: 200,
				to: 800,
				prefix: "$"
			}
		);
	};

	$(document).ready(function () {
		CRUMINA.rangeSlider();
	});
};