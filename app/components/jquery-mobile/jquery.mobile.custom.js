/*
* jQuery Mobile v1.3.1
* http://jquerymobile.com
*
* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/

(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {
// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j, len;

	event = $.Event( event );
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
	// https://github.com/jquery/jquery-mobile/issues/3280
	if ( t.search( /^(mouse|click)/ ) > -1 ) {
		props = mouseEventProps;
	}

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++) {
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout( function() {
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ) {
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data( event.target, touchTargetPropertyName );

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
		var ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			var t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold,
		flags = getVirtualBindingFlags( event.target );

		didScroll = didScroll ||
			( Math.abs( t.pageX - startX ) > moveThreshold ||
				Math.abs( t.pageY - startY ) > moveThreshold );


	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		var ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is syntehsized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );

(function( $ ) {
	$.mobile = {};
}( jQuery ));
	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));


(function( $, window, undefined ) {
	var $document = $( document );

	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.dispatch.call( obj, event );
		event.type = originalType;
	}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,

		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				scrolling = state;
				triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( "vmousedown", function( event ) {

				if ( event.which && event.which !== 1 ) {
					return false;
				}

				var origTarget = event.target,
					origEvent = event.originalEvent,
					timer;

				function clearTapTimer() {
					clearTimeout( timer );
				}

				function clearTapHandlers() {
					clearTapTimer();

					$this.unbind( "vclick", clickHandler )
						.unbind( "vmouseup", clearTapTimer );
					$document.unbind( "vmousecancel", clearTapHandlers );
				}

				function clickHandler( event ) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if ( origTarget === event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					}
				}

				$this.bind( "vmouseup", clearTapTimer )
					.bind( "vclick", clickHandler );
				$document.bind( "vmousecancel", clearTapHandlers );

				timer = setTimeout( function() {
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
				}, $.event.special.tap.tapholdThreshold );
			});
		}
	};

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		start: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					};
		},

		stop: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event;
			return {
						time: ( new Date() ).getTime(),
						coords: [ data.pageX, data.pageY ]
					};
		},

		handleSwipe: function( start, stop ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

				start.origin.trigger( "swipe" )
					.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
			}
		},

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( touchStartEvent, function( event ) {
				var start = $.event.special.swipe.start( event ),
					stop;

				function moveHandler( event ) {
					if ( !start ) {
						return;
					}

					stop = $.event.special.swipe.stop( event );

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				$this.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function() {
						$this.unbind( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							$.event.special.swipe.handleSwipe( start, stop );
						}
						start = stop = undefined;
					});
			});
		}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			}
		};
	});

})( jQuery, this );

(function( $, window, undefined ) {
	var nsNormalizeDict = {};

	// jQuery.mobile configurable options
	$.mobile = $.extend($.mobile, {

		// Version of the jQuery Mobile Framework
		version: "1.3.1",

		// Namespace used framework-wide for data-attrs. Default is no namespace
		ns: "",

		// Define the url parameter used for referencing widget-generated sub-pages.
		// Translates to to example.html&ui-page=subpageIdentifier
		// hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: "ui-page",

		// Class assigned to page currently in view, and during transitions
		activePageClass: "ui-page-active",

		// Class used for "active" button state, from CSS framework
		activeBtnClass: "ui-btn-active",

		// Class used for "focus" form element state, from CSS framework
		focusClass: "ui-focus",

		// Automatically handle clicks and form submissions through Ajax, when same-domain
		ajaxEnabled: true,

		// Automatically load and show pages based on location.hash
		hashListeningEnabled: true,

		// disable to prevent jquery from bothering with links
		linkBindingEnabled: true,

		// Set default page transition - 'none' for no transitions
		defaultPageTransition: "fade",

		// Set maximum window width for transitions to apply - 'false' for no limit
		maxTransitionWidth: false,

		// Minimum scroll distance that will be remembered when returning to a page
		minScrollBack: 250,

		// DEPRECATED: the following property is no longer in use, but defined until 2.0 to prevent conflicts
		touchOverflowEnabled: false,

		// Set default dialog transition - 'none' for no transitions
		defaultDialogTransition: "pop",

		// Error response message - appears when an Ajax page request fails
		pageLoadErrorMessage: "Error Loading Page",

		// For error messages, which theme does the box uses?
		pageLoadErrorMessageTheme: "e",

		// replace calls to window.history.back with phonegaps navigation helper
		// where it is provided on the window object
		phonegapNavigationEnabled: false,

		//automatically initialize the DOM when it's ready
		autoInitializePage: true,

		pushStateEnabled: true,

		// allows users to opt in to ignoring content by marking a parent element as
		// data-ignored
		ignoreContentEnabled: false,

		// turn of binding to the native orientationchange due to android orientation behavior
		orientationChangeEnabled: true,

		buttonMarkup: {
			hoverDelay: 200
		},

		// define the window and the document objects
		window: $( window ),
		document: $( document ),

		// TODO might be useful upstream in jquery itself ?
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},

		// Place to store various widget extensions
		behaviors: {},

		// Scroll page vertically: scroll to 0 to hide iOS address bar, or pass a Y value
		silentScroll: function( ypos ) {
			if ( $.type( ypos ) !== "number" ) {
				ypos = $.mobile.defaultHomeScroll;
			}

			// prevent scrollstart and scrollstop events
			$.event.special.scrollstart.enabled = false;

			setTimeout( function() {
				window.scrollTo( 0, ypos );
				$.mobile.document.trigger( "silentscroll", { x: 0, y: ypos });
			}, 20 );

			setTimeout( function() {
				$.event.special.scrollstart.enabled = true;
			}, 150 );
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			if ( !prop ) {
				return;
			}

			return nsNormalizeDict[ prop ] || ( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		// Find the closest parent with a theme class on it. Note that
		// we are not using $.fn.closest() on purpose here because this
		// method gets called quite a bit and we need it to be as fast
		// as possible.
		getInheritedTheme: function( el, defaultTheme ) {
			var e = el[ 0 ],
				ltr = "",
				re = /ui-(bar|body|overlay)-([a-z])\b/,
				c, m;

			while ( e ) {
				c = e.className || "";
				if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
					// We found a parent with a theme class
					// on it so bail from this loop.
					break;
				}

				e = e.parentNode;
			}

			// Return the theme letter we found, if none, return the
			// specified default.

			return ltr || defaultTheme || "a";
		},

		// TODO the following $ and $.fn extensions can/probably should be moved into jquery.mobile.core.helpers
		//
		// Find the closest javascript page element to gather settings data jsperf test
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		// possibly naive, but it shows that the parsing overhead for *just* the page selector vs
		// the page and dialog selector is negligable. This could probably be speed up by
		// doing a similar parent node traversal to the one found in the inherited theme code above
		closestPageData: function( $target ) {
			return $target
				.closest( ':jqmData(role="page"), :jqmData(role="dialog")' )
				.data( "mobile-page" );
		},

		enhanceable: function( $set ) {
			return this.haveParents( $set, "enhance" );
		},

		hijackable: function( $set ) {
			return this.haveParents( $set, "ajax" );
		},

		haveParents: function( $set, attr ) {
			if ( !$.mobile.ignoreContentEnabled ) {
				return $set;
			}

			var count = $set.length,
				$newSet = $(),
				e, $element, excluded;

			for ( var i = 0; i < count; i++ ) {
				$element = $set.eq( i );
				excluded = false;
				e = $set[ i ];

				while ( e ) {
					var c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

					if ( c === "false" ) {
						excluded = true;
						break;
					}

					e = e.parentNode;
				}

				if ( !excluded ) {
					$newSet = $newSet.add( $element );
				}
			}

			return $newSet;
		},

		getScreenHeight: function() {
			// Native innerHeight returns more accurate value for this across platforms,
			// jQuery version is here as a normalized fallback for platforms like Symbian
			return window.innerHeight || $.mobile.window.height();
		}
	}, $.mobile );

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			if ( prop ) {
				prop = $.mobile.nsNormalize( prop );
			}

			// undefined is permitted as an explicit input for the second param
			// in this case it returns the value and does not set it to undefined
			if( arguments.length < 2 || value === undefined ){
				result = this.data( prop );
			} else {
				result = this.data( prop, value );
			}
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};

	$.fn.removeWithDependents = function() {
		$.removeWithDependents( this );
	};

	$.removeWithDependents = function( elem ) {
		var $elem = $( elem );

		( $elem.jqmData( 'dependents' ) || $() ).remove();
		$elem.remove();
	};

	$.fn.addDependents = function( newDependents ) {
		$.addDependents( $( this ), newDependents );
	};

	$.addDependents = function( elem, newDependents ) {
		var dependents = $( elem ).jqmData( 'dependents' ) || $();

		$( elem ).jqmData( 'dependents', $.merge( dependents, newDependents ) );
	};

	// note that this helper doesn't attempt to handle the callback
	// or setting of an html element's text, its only purpose is
	// to return the html encoded version of the text in all cases. (thus the name)
	$.fn.getEncodedText = function() {
		return $( "<div/>" ).text( $( this ).text() ).html();
	};

	// fluent helper function for the mobile namespaced equivalent
	$.fn.jqmEnhanceable = function() {
		return $.mobile.enhanceable( this );
	};

	$.fn.jqmHijackable = function() {
		return $.mobile.hijackable( this );
	};

	// Monkey-patching Sizzle to filter the :jqmData selector
	var oldFind = $.find,
		jqmDataRE = /:jqmData\(([^)]*)\)/g;

	$.find = function( selector, context, ret, extra ) {
		selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

	$.find.matches = function( expr, set ) {
		return $.find( expr, null, null, set );
	};

	$.find.matchesSelector = function( node, expr ) {
		return $.find( expr, null, null, [ node ] ).length > 0;
	};
})( jQuery, this );


(function( $, undefined ) {

// This function calls getAttribute, which should be safe for data-* attributes
var getAttrFixed = function( e, key ) {
	var value = e.getAttribute( key );

	return value === "true" ? true :
		value === "false" ? false :
		value === null ? undefined : value;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this,
		nsKey = "data-" + $.mobile.ns,
		key;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) === "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : getAttrFixed( e, nsKey + "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : getAttrFixed( e, nsKey + "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : getAttrFixed( e, nsKey + "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : getAttrFixed( e, nsKey + "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : getAttrFixed( e, nsKey + "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : getAttrFixed( e, nsKey + "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : getAttrFixed( e, nsKey + "iconshadow" ),
				mini:       options.mini       !== undefined ? options.mini       : getAttrFixed( e, nsKey + "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			hover = false,
			state = "up",
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		for ( key in o ) {
			if ( o[ key ] === undefined || o[ key ] === null ) {
				el.removeAttr( nsKey + key );
			} else {
				e.setAttribute( nsKey + key, o[ key ] );
			}
		}

		if ( getAttrFixed( e, nsKey + "rel" ) === "popup" && el.attr( "href" ) ) {
			e.setAttribute( "aria-haspopup", true );
			e.setAttribute( "aria-owns", el.attr( "href" ) );
		}

		// Check if this element is already enhanced
		buttonElements = $.data( ( ( e.tagName === "INPUT" || e.tagName === "BUTTON" ) ? e.parentNode : e ), "buttonElements" );

		if ( buttonElements ) {
			e = buttonElements.outer;
			el = $( e );
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$( buttonElements.icon ).remove();
			buttonElements.icon = null;
			hover = buttonElements.hover;
			state = buttonElements.state;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements ) {
			attachEvents();
		}

		// if not, try to find closest theme container
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );
		}

		buttonClass = "ui-btn ";
		buttonClass += ( hover ? "ui-btn-hover-" + o.theme : "" );
		buttonClass += ( state ? " ui-btn-" + state + "-" + o.theme : "" );
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini === true ? " ui-mini" : " ui-fullsize";
		}

		if ( o.inline !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `inline` style.
			buttonClass += o.inline === true ? " ui-btn-inline" : " ui-btn-block";
		}

		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos === "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;
		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !( buttonElements && buttonElements.icon ) ) {
				buttonIcon.innerHTML = "&#160;";
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements ) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			hover : hover,
			state : state,
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data( e,           'buttonElements', buttonElements );
		$.data( buttonInner, 'buttonElements', buttonElements );
		$.data( buttonText,  'buttonElements', buttonElements );
		if ( buttonIcon ) {
			$.data( buttonIcon, 'buttonElements', buttonElements );
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && ( element.className + ' ' );
        if ( cname && cname.indexOf( "ui-btn " ) > -1 && cname.indexOf( "ui-disabled " ) < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

function updateButtonClass( $btn, classToRemove, classToAdd, hover, state ) {
	var buttonElements = $.data( $btn[ 0 ], "buttonElements" );
	$btn.removeClass( classToRemove ).addClass( classToAdd );
	if ( buttonElements ) {
		buttonElements.bcls = $( document.createElement( "div" ) )
			.addClass( buttonElements.bcls + " " + classToAdd )
			.removeClass( classToRemove )
			.attr( "class" );
		if ( hover !== undefined ) {
			buttonElements.hover = hover;
		}
		buttonElements.state = state;
	}
}

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$.mobile.document.bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				isTouchEvent = event.originalEvent && /^touch/.test( event.originalEvent.type ),
				evt = event.type;

			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );

				if ( evt === "vmousedown" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						hov = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-down-" + theme, undefined, "down" );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					updateButtonClass( $btn, "ui-btn-down-" + theme, "ui-btn-up-" + theme, undefined, "up" );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( isTouchEvent ) {
						// Use a short delay to determine if the user is scrolling before highlighting
						foc = setTimeout( function() {
							updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
						}, hoverDelay );
					} else {
						updateButtonClass( $btn, "ui-btn-up-" + theme, "ui-btn-hover-" + theme, true, "" );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					updateButtonClass( $btn, "ui-btn-hover-" + theme  + " ui-btn-down-" + theme, "ui-btn-up-" + theme, false, "up" );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ) {
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ) {
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

//links in bars, or those with  data-role become buttons
//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	$( ":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", e.target )
		.jqmEnhanceable()
		.not( "button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.buttonMarkup();
});

})( jQuery );


/** @license
 * Plugin to load JS files that have dependencies but aren't wrapped into
 * `define` calls.
 * Author: Miller Medeiros
 * Version: 0.1.0 (2011/12/13)
 * Released under the MIT license
 */
define('depend',[],function () {

    var rParts = /^(.*)\[([^\]]*)\]$/;

    return {

        //example: depend!bar[jquery,lib/foo]
        load : function(name, req, onLoad, config){
            var parts = rParts.exec(name);

            req(parts[2].split(','), function(){
                req([parts[1]], function(mod){
                    onLoad(mod);
                });
            });
        }

    };

});

/*!
 * jQuery UI Widget v1.10.0pre - 2012-11-13 (ff055a0c353c3c8ce6e5bfa07ad7cb03e8885bc5)
 * http://jqueryui.com
 *
 * Copyright 2010, 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.widget", {
	// decorate the parent _createWidget to trigger `widgetinit` for users
	// who wish to do post post `widgetcreate` alterations/additions
	//
	// TODO create a pull request for jquery ui to trigger this event
	// in the original _createWidget
	_createWidget: function() {
		$.Widget.prototype._createWidget.apply( this, arguments );
		this._trigger( 'init' );
	},

	_getCreateOptions: function() {

		var elem = this.element,
			options = {};

		$.each( this.options, function( option ) {

			var value = elem.jqmData( option.replace( /[A-Z]/g, function( c ) {
							return "-" + c.toLowerCase();
						})
					);

			if ( value !== undefined ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	enhanceWithin: function( target, useKeepNative ) {
		this.enhance( $( this.options.initSelector, $( target )), useKeepNative );
	},

	enhance: function( targets, useKeepNative ) {
		var page, keepNative, $widgetElements = $( targets ), self = this;

		// if ignoreContentEnabled is set to true the framework should
		// only enhance the selected elements when they do NOT have a
		// parent with the data-namespace-ignore attribute
		$widgetElements = $.mobile.enhanceable( $widgetElements );

		if ( useKeepNative && $widgetElements.length ) {
			// TODO remove dependency on the page widget for the keepNative.
			// Currently the keepNative value is defined on the page prototype so
			// the method is as well
			page = $.mobile.closestPageData( $widgetElements );
			keepNative = ( page && page.keepNativeSelector()) || "";

			$widgetElements = $widgetElements.not( keepNative );
		}

		$widgetElements[ this.widgetName ]();
	},

	raise: function( msg ) {
		throw "Widget [" + this.widgetName + "]: " + msg;
	}
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.page", $.mobile.widget, {
	options: {
		theme: "c",
		domCache: false,
		keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
	},

	_create: function() {
		// if false is returned by the callbacks do not create the page
		if ( this._trigger( "beforecreate" ) === false ) {
			return false;
		}

		this.element
			.attr( "tabindex", "0" )
			.addClass( "ui-page ui-body-" + this.options.theme );

		this._on( this.element, {
			pagebeforehide: "removeContainerBackground",
			pagebeforeshow: "_handlePageBeforeShow"
		});
	},

	_handlePageBeforeShow: function( e ) {
		this.setContainerBackground();
	},

	removeContainerBackground: function() {
		$.mobile.pageContainer.removeClass( "ui-overlay-" + $.mobile.getInheritedTheme( this.element.parent() ) );
	},

	// set the page container background to the page theme
	setContainerBackground: function( theme ) {
		if ( this.options.theme ) {
			$.mobile.pageContainer.addClass( "ui-overlay-" + ( theme || this.options.theme ) );
		}
	},

	keepNativeSelector: function() {
		var options = this.options,
			keepNativeDefined = options.keepNative && $.trim( options.keepNative );

		if ( keepNativeDefined && options.keepNative !== options.keepNativeDefault ) {
			return [options.keepNative, options.keepNativeDefault].join( ", " );
		}

		return options.keepNativeDefault;
	}
});
})( jQuery );

(function( $, undefined ) {

$.mobile.page.prototype.options.degradeInputs = {
	color: false,
	date: false,
	datetime: false,
	"datetime-local": false,
	email: false,
	month: false,
	number: false,
	range: "number",
	search: "text",
	tel: false,
	time: false,
	url: false,
	week: false
};


//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {

	var page = $.mobile.closestPageData( $( e.target ) ), options;

	if ( !page ) {
		return;
	}

	options = page.options;

	// degrade inputs to avoid poorly implemented native functionality
	$( e.target ).find( "input" ).not( page.keepNativeSelector() ).each(function() {
		var $this = $( this ),
			type = this.getAttribute( "type" ),
			optType = options.degradeInputs[ type ] || "text";

		if ( options.degradeInputs[ type ] ) {
			var html = $( "<div>" ).html( $this.clone() ).html(),
				// In IE browsers, the type sometimes doesn't exist in the cloned markup, so we replace the closing tag instead
				hasType = html.indexOf( " type=" ) > -1,
				findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/,
				repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );

			$this.replaceWith( html.replace( findstr, repstr ) );
		}
	});

});

})( jQuery );

(function( $ ) {
	var	meta = $( "meta[name=viewport]" ),
		initialContent = meta.attr( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
		enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
		disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );

	$.mobile.zoom = $.extend( {}, {
		enabled: !disabledInitially,
		locked: false,
		disable: function( lock ) {
			if ( !disabledInitially && !$.mobile.zoom.locked ) {
				meta.attr( "content", disabledZoom );
				$.mobile.zoom.enabled = false;
				$.mobile.zoom.locked = lock || false;
			}
		},
		enable: function( unlock ) {
			if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
				meta.attr( "content", enabledZoom );
				$.mobile.zoom.enabled = true;
				$.mobile.zoom.locked = false;
			}
		},
		restore: function() {
			if ( !disabledInitially ) {
				meta.attr( "content", initialContent );
				$.mobile.zoom.enabled = true;
			}
		}
	});

}( jQuery ));

(function( $, undefined ) {

$.widget( "mobile.textinput", $.mobile.widget, {
	options: {
		theme: null,
		mini: false,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",
		clearBtn: false,
		clearSearchButtonText: null, //deprecating for 1.3...
		clearBtnText: "clear text",
		disabled: false
	},

	_create: function() {

		var self = this,
			input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			miniclass = o.mini ? " ui-mini" : "",
			isSearch = input.is( "[type='search'], :jqmData(type='search')" ),
			focusedEl,
			clearbtn,
			clearBtnText = o.clearSearchButtonText || o.clearBtnText,
			clearBtnBlacklist = input.is( "textarea, :jqmData(type='range')" ),
			inputNeedsClearBtn = !!o.clearBtn && !clearBtnBlacklist,
			inputNeedsWrap = input.is( "input" ) && !input.is( ":jqmData(type='range')" );

		function toggleClear() {
			setTimeout( function() {
				clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
			}, 0 );
		}

		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass( "ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}

		//"search" and "text" input widgets
		if ( isSearch ) {
			focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + themeclass + miniclass + "'></div>" ).parent();
		} else if ( inputNeedsWrap ) {
			focusedEl = input.wrap( "<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow" + themeclass + miniclass + "'></div>" ).parent();
		}

		if( inputNeedsClearBtn || isSearch ) {
			clearbtn = $( "<a href='#' class='ui-input-clear' title='" + clearBtnText + "'>" + clearBtnText + "</a>" )
				.bind( "click", function( event ) {
					input
						.val( "" )
						.focus()
						.trigger( "change" );
					clearbtn.addClass( "ui-input-clear-hidden" );
					event.preventDefault();
				})
				.appendTo( focusedEl )
				.buttonMarkup({
					icon: "delete",
					iconpos: "notext",
					corners: true,
					shadow: true,
					mini: o.mini
				});
				
			if ( !isSearch ) {
				focusedEl.addClass( "ui-input-has-clear" );
			}

			toggleClear();

			input.bind( "paste cut keyup input focus change blur", toggleClear );
		}
		else if ( !inputNeedsWrap && !isSearch ) {
			input.addClass( "ui-corner-all ui-shadow-inset" + themeclass + miniclass );
		}

		input.focus(function() {
				// In many situations, iOS will zoom into the input upon tap, this prevents that from happening
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
				}			
				focusedEl.addClass( $.mobile.focusClass );
			})
			.blur(function() {
				focusedEl.removeClass( $.mobile.focusClass );
				if ( o.preventFocusZoom ) {
					$.mobile.zoom.enable( true );
				}				
			});

		// Autogrow
		if ( input.is( "textarea" ) ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyupTimeout;

			this._keyup = function() {
				var scrollHeight = input[ 0 ].scrollHeight,
					clientHeight = input[ 0 ].clientHeight;

				if ( clientHeight < scrollHeight ) {
					var paddingTop = parseFloat( input.css( "padding-top" ) ),
						paddingBottom = parseFloat( input.css( "padding-bottom" ) ),
						paddingHeight = paddingTop + paddingBottom;
					
					input.height( scrollHeight - paddingHeight + extraLineHeight );
				}
			};

			input.on( "keyup change input paste", function() {
				clearTimeout( keyupTimeout );
				keyupTimeout = setTimeout( self._keyup, keyupTimeoutBuffer );
			});

			// binding to pagechange here ensures that for pages loaded via
			// ajax the height is recalculated without user input
			this._on( true, $.mobile.document, { "pagechange": "_keyup" });

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( input.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				this._on( true, $.mobile.window, {"load": "_keyup"});
			}
		}
		if ( input.attr( "disabled" ) ) {
			this.disable();
		}
	},

	disable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsDisabled = this.element.attr( "disabled", true )	&& ( inputNeedsWrap || isSearch );
			
		if ( parentNeedsDisabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.addClass( "ui-disabled" );
		return this._setOption( "disabled", true );
	},

	enable: function() {
		var $el,
			isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
			inputNeedsWrap = this.element.is( "input" ) && !this.element.is( ":jqmData(type='range')" ),
			parentNeedsEnabled = this.element.attr( "disabled", false )	&& ( inputNeedsWrap || isSearch );

		if ( parentNeedsEnabled ) {
			$el = this.element.parent();
		} else {
			$el = this.element;
		}
		$el.removeClass( "ui-disabled" );
		return this._setOption( "disabled", false );
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.textinput.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {

$.mobile.behaviors.formReset = {
	_handleFormReset: function() {
		this._on( this.element.closest( "form" ), {
			reset: function() {
				this._delay( "_reset" );
			}
		});
	}
};

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.slider", $.mobile.widget, $.extend( {
	widgetEventPrefix: "slide",

	options: {
		theme: null,
		trackTheme: null,
		disabled: false,
		initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
		mini: false,
		highlight: false
	},

	_create: function() {

		// TODO: Each of these should have comments explain what they're for
		var self = this,
			control = this.element,
			parentTheme = $.mobile.getInheritedTheme( control, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme,
			cType = control[ 0 ].nodeName.toLowerCase(),
			isSelect = this.isToggleSwitch = cType === "select",
			isRangeslider = control.parent().is( ":jqmData(role='rangeslider')" ),
			selectClass = ( this.isToggleSwitch ) ? "ui-slider-switch" : "",
			controlID = control.attr( "id" ),
			$label = $( "[for='" + controlID + "']" ),
			labelID = $label.attr( "id" ) || controlID + "-label",
			label = $label.attr( "id", labelID ),
			min = !this.isToggleSwitch ? parseFloat( control.attr( "min" ) ) : 0,
			max =  !this.isToggleSwitch ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,
			step = window.parseFloat( control.attr( "step" ) || 1 ),
			miniClass = ( this.options.mini || control.jqmData( "mini" ) ) ? " ui-mini" : "",
			domHandle = document.createElement( "a" ),
			handle = $( domHandle ),
			domSlider = document.createElement( "div" ),
			slider = $( domSlider ),
			valuebg = this.options.highlight && !this.isToggleSwitch ? (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( slider );
			})() : false,
			options,
			wrapper;
			
		domHandle.setAttribute( "href", "#" );
		domSlider.setAttribute( "role", "application" );
		domSlider.className = [this.isToggleSwitch ? "ui-slider " : "ui-slider-track ",selectClass," ui-btn-down-",trackTheme," ui-btn-corner-all", miniClass].join( "" );
		domHandle.className = "ui-slider-handle";
		domSlider.appendChild( domHandle );

		handle.buttonMarkup({ corners: true, theme: theme, shadow: true })
				.attr({
					"role": "slider",
					"aria-valuemin": min,
					"aria-valuemax": max,
					"aria-valuenow": this._value(),
					"aria-valuetext": this._value(),
					"title": this._value(),
					"aria-labelledby": labelID
				});

		$.extend( this, {
			slider: slider,
			handle: handle,
			type: cType,
			step: step,
			max: max,
			min: min,
			valuebg: valuebg,
			isRangeslider: isRangeslider,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		});

		if ( this.isToggleSwitch ) {
			wrapper = document.createElement( "div" );
			wrapper.className = "ui-slider-inneroffset";

			for ( var j = 0, length = domSlider.childNodes.length; j < length; j++ ) {
				wrapper.appendChild( domSlider.childNodes[j] );
			}

			domSlider.appendChild( wrapper );

			// slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );

			// make the handle move with a smooth transition
			handle.addClass( "ui-slider-handle-snapping" );

			options = control.find( "option" );

			for ( var i = 0, optionsCount = options.length; i < optionsCount; i++ ) {
				var side = !i ? "b" : "a",
					sliderTheme = !i ? " ui-btn-down-" + trackTheme : ( " " + $.mobile.activeBtnClass ),
					sliderLabel = document.createElement( "div" ),
					sliderImg = document.createElement( "span" );

				sliderImg.className = ["ui-slider-label ui-slider-label-", side, sliderTheme, " ui-btn-corner-all"].join( "" );
				sliderImg.setAttribute( "role", "img" );
				sliderImg.appendChild( document.createTextNode( options[i].innerHTML ) );
				$( sliderImg ).prependTo( slider );
			}

			self._labels = $( ".ui-slider-label", slider );

		}

		label.addClass( "ui-slider" );
		
		// monitor the input for updated values
		control.addClass( this.isToggleSwitch ? "ui-slider-switch" : "ui-slider-input" );

		this._on( control, {
			"change": "_controlChange",
			"keyup": "_controlKeyup",
			"blur": "_controlBlur",
			"vmouseup": "_controlVMouseUp"
		});

		slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
			.bind( "vclick", false );

		// We have to instantiate a new function object for the unbind to work properly
		// since the method itself is defined in the prototype (causing it to unbind everything)
		this._on( document, { "vmousemove": "_preventDocumentDrag" });
		this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" });

		slider.insertAfter( control );

		// wrap in a div for styling purposes
		if ( !this.isToggleSwitch && !isRangeslider ) {
			wrapper = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>";
			
			control.add( slider ).wrapAll( wrapper );
		}

		// Only add focus class to toggle switch, sliders get it automatically from ui-btn
		if ( this.isToggleSwitch ) {
			this.handle.bind({
				focus: function() {
					slider.addClass( $.mobile.focusClass );
				},

				blur: function() {
					slider.removeClass( $.mobile.focusClass );
				}
			});
		}

		// bind the handle event callbacks and set the context to the widget instance
		this._on( this.handle, {
			"vmousedown": "_handleVMouseDown",
			"keydown": "_handleKeydown",
			"keyup": "_handleKeyup"
		});

		this.handle.bind( "vclick", false );

		this._handleFormReset();

		this.refresh( undefined, undefined, true );
	},

	_controlChange: function( event ) {
		// if the user dragged the handle, the "change" event was triggered from inside refresh(); don't call refresh() again
		if ( this._trigger( "controlchange", event ) === false ) {
			return false;
		}
		if ( !this.mouseMoved ) {
			this.refresh( this._value(), true );
		}
	},

	_controlKeyup: function( event ) { // necessary?
		this.refresh( this._value(), true, true );
	},

	_controlBlur: function( event ) {
		this.refresh( this._value(), true );
	},

	// it appears the clicking the up and down buttons in chrome on
	// range/number inputs doesn't trigger a change until the field is
	// blurred. Here we check thif the value has changed and refresh
	_controlVMouseUp: function( event ) {
		this._checkedRefresh();
	},

	// NOTE force focus on handle
	_handleVMouseDown: function( event ) {
		this.handle.focus();
	},

	_handleKeydown: function( event ) {
		var index = this._value();
		if ( this.options.disabled ) {
			return;
		}

		// In all cases prevent the default and mark the handle as active
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
			case $.mobile.keyCode.END:
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				event.preventDefault();

				if ( !this._keySliding ) {
					this._keySliding = true;
					this.handle.addClass( "ui-state-active" );
				}

				break;
		}

		// move the slider according to the keypress
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
				this.refresh( this.min );
				break;
			case $.mobile.keyCode.END:
				this.refresh( this.max );
				break;
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
				this.refresh( index + this.step );
				break;
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				this.refresh( index - this.step );
				break;
		}
	}, // remove active mark

	_handleKeyup: function( event ) {
		if ( this._keySliding ) {
			this._keySliding = false;
			this.handle.removeClass( "ui-state-active" );
		}
	},

	_sliderVMouseDown: function( event ) {
		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this.options.disabled || !( event.which === 1 || event.which === 0 ) ) {
			return false;
		}
		if ( this._trigger( "beforestart", event ) === false ) {
			return false;
		}
		this.dragging = true;
		this.userModified = false;
		this.mouseMoved = false;

		if ( this.isToggleSwitch ) {
			this.beforeStart = this.element[0].selectedIndex;
		}

		
		this.refresh( event );
		this._trigger( "start" );
		return false;
	},

	_sliderVMouseUp: function() {
		if ( this.dragging ) {
			this.dragging = false;

			if ( this.isToggleSwitch ) {
				// make the handle move with a smooth transition
				this.handle.addClass( "ui-slider-handle-snapping" );

				if ( this.mouseMoved ) {
					// this is a drag, change the value only if user dragged enough
					if ( this.userModified ) {
						this.refresh( this.beforeStart === 0 ? 1 : 0 );
					} else {
						this.refresh( this.beforeStart );
					}
				} else {
					// this is just a click, change the value
					this.refresh( this.beforeStart === 0 ? 1 : 0 );
				}
			}

			this.mouseMoved = false;
			this._trigger( "stop" );
			return false;
		}
	},

	_preventDocumentDrag: function( event ) {
			// NOTE: we don't do this in refresh because we still want to
			//       support programmatic alteration of disabled inputs
			if ( this._trigger( "drag", event ) === false) {
				return false;
			}
			if ( this.dragging && !this.options.disabled ) {
				
				// this.mouseMoved must be updated before refresh() because it will be used in the control "change" event
				this.mouseMoved = true;

				if ( this.isToggleSwitch ) {
					// make the handle move in sync with the mouse
					this.handle.removeClass( "ui-slider-handle-snapping" );
				}
				
				this.refresh( event );

				// only after refresh() you can calculate this.userModified
				this.userModified = this.beforeStart !== this.element[0].selectedIndex;
				return false;
			}
		},

	_checkedRefresh: function() {
		if ( this.value !== this._value() ) {
			this.refresh( this._value() );
		}
	},

	_value: function() {
		return  this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat( this.element.val() ) ;
	},


	_reset: function() {
		this.refresh( undefined, false, true );
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {
		// NOTE: we don't return here because we want to support programmatic
		//       alteration of the input value, which should still update the slider
		
		var self = this,
			parentTheme = $.mobile.getInheritedTheme( this.element, "c" ),
			theme = this.options.theme || parentTheme,
			trackTheme = this.options.trackTheme || parentTheme,
			left, width, data, tol;

		self.slider[0].className = [ this.isToggleSwitch ? "ui-slider ui-slider-switch" : "ui-slider-track"," ui-btn-down-" + trackTheme,' ui-btn-corner-all', ( this.options.mini ) ? " ui-mini":""].join( "" );
		if ( this.options.disabled || this.element.attr( "disabled" ) ) {
			this.disable();
		}

		// set the stored value for comparison later
		this.value = this._value();
		if ( this.options.highlight && !this.isToggleSwitch && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
			this.valuebg = (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass + " ui-btn-corner-all";
				return $( bg ).prependTo( self.slider );
			})();
		}
		this.handle.buttonMarkup({ corners: true, theme: theme, shadow: true });

		var pxStep, percent,
			control = this.element,
			isInput = !this.isToggleSwitch,
			optionElements = isInput ? [] : control.find( "option" ),
			min =  isInput ? parseFloat( control.attr( "min" ) ) : 0,
			max = isInput ? parseFloat( control.attr( "max" ) ) : optionElements.length - 1,
			step = ( isInput && parseFloat( control.attr( "step" ) ) > 0 ) ? parseFloat( control.attr( "step" ) ) : 1;
			
		if ( typeof val === "object" ) {
			data = val;
			// a slight tolerance helped get to the ends of the slider
			tol = 8;

			left = this.slider.offset().left;
			width = this.slider.width();
			pxStep = width/((max-min)/step);
			if ( !this.dragging ||
					data.pageX < left - tol ||
					data.pageX > left + width + tol ) {
				return;
			}
			if ( pxStep > 1 ) {
				percent = ( ( data.pageX - left ) / width ) * 100;
			} else {
				percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
			}
		} else {
			if ( val == null ) {
				val = isInput ? parseFloat( control.val() || 0 ) : control[0].selectedIndex;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		var newval = ( percent / 100 ) * ( max - min ) + min;

		//from jQuery UI slider, the following source will round to the nearest step
		var valModStep = ( newval - min ) % step;
		var alignValue = newval - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		var percentPerStep = 100/((max-min)/step);
		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see jQueryUI: #4124)
		newval = parseFloat( alignValue.toFixed(5) );

		if ( typeof pxStep === "undefined" ) {
			pxStep = width / ( (max-min) / step );
		}
		if ( pxStep > 1 && isInput ) {
			percent = ( newval - min ) * percentPerStep * ( 1 / step );
		}
		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		this.handle.css( "left", percent + "%" );

		this.handle[0].setAttribute( "aria-valuenow", isInput ? newval : optionElements.eq( newval ).attr( "value" ) );

		this.handle[0].setAttribute( "aria-valuetext", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		this.handle[0].setAttribute( "title", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		if ( this.valuebg ) {
			this.valuebg.css( "width", percent + "%" );
		}

		// drag the label widths
		if ( this._labels ) {
			var handlePercent = this.handle.width() / this.slider.width() * 100,
				aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100,
				bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

			this._labels.each(function() {
				var ab = $( this ).is( ".ui-slider-label-a" );
				$( this ).width( ( ab ? aPercent : bPercent  ) + "%" );
			});
		}

		if ( !preventInputUpdate ) {
			var valueChanged = false;

			// update control"s value
			if ( isInput ) {
				valueChanged = control.val() !== newval;
				control.val( newval );
			} else {
				valueChanged = control[ 0 ].selectedIndex !== newval;
				control[ 0 ].selectedIndex = newval;
			}
			if ( this._trigger( "beforechange", val ) === false) {
					return false;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	enable: function() {
		this.element.attr( "disabled", false );
		this.slider.removeClass( "ui-disabled" ).attr( "aria-disabled", false );
		return this._setOption( "disabled", false );
	},

	disable: function() {
		this.element.attr( "disabled", true );
		this.slider.addClass( "ui-disabled" ).attr( "aria-disabled", true );
		return this._setOption( "disabled", true );
	}

}, $.mobile.behaviors.formReset ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.slider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.mobile.widget, {

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='rangeslider')",
			mini: false,
			highlight: true
		},

		_create: function() {
			var secondLabel,
			$el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			_inputFirst = $el.find( "input" ).first(),
			_inputLast = $el.find( "input" ).last(),
			label = $el.find( "label" ).first(),
			_sliderFirst = $.data( _inputFirst.get(0), "mobileSlider" ).slider,
			_sliderLast = $.data( _inputLast.get(0), "mobileSlider" ).slider,
			firstHandle = $.data( _inputFirst.get(0), "mobileSlider" ).handle,
			_sliders = $( "<div class=\"ui-rangeslider-sliders\" />" ).appendTo( $el );
			
			if ( $el.find( "label" ).length > 1 ) {
				secondLabel = $el.find( "label" ).last().hide();
			}

			_inputFirst.addClass( "ui-rangeslider-first" );
			_inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );
			
			_sliderFirst.appendTo( _sliders );
			_sliderLast.appendTo( _sliders );
			label.prependTo( $el );
			firstHandle.prependTo( _sliderLast );

			$.extend( this, {
				_inputFirst: _inputFirst,
				_inputLast: _inputLast,
				_sliderFirst: _sliderFirst,
				_sliderLast: _sliderLast,
				_targetVal: null,
				_sliderTarget: false,
				_sliders: _sliders,
				_proxy: false
			});
			
			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": "_slidebeforestart",
				"slidestop": "_slidestop",
				"slidedrag": "_slidedrag",
				"slidebeforechange": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on({
				"mousedown":"_change"
			});
			this._on( this.element.closest( "form" ), {
				"reset":"_handleReset"
			});
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},
		_handleReset: function(){
			var self = this;
			//we must wait for the stack to unwind before updateing other wise sliders will not have updated yet
			setTimeout( function(){
				self._updateHighlight();
			},0);
		},

		_dragFirstHandle: function( event ) {
			//if the first handle is dragged send the event to the first slider
			$.data( this._inputFirst.get(0), "mobileSlider" ).dragging = true;
			$.data( this._inputFirst.get(0), "mobileSlider" ).refresh( event );
			return false;
		},

		_slidedrag: function( event ) {
			var first = $( event.target ).is( this._inputFirst ),
				otherSlider = ( first ) ? this._inputLast : this._inputFirst;

			this._sliderTarget = false;
			//if the drag was initiated on an extreme and the other handle is focused send the events to
			//the closest handle
			if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
				$.data( otherSlider.get(0), "mobileSlider" ).dragging = true;
				$.data( otherSlider.get(0), "mobileSlider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = $( event.target ).is( this._inputFirst );
			
			this._proxy = false;
			//this stops dragging of the handle and brings the active track to the front 
			//this makes clicks on the track go the the last handle used
			this.element.find( "input" ).trigger( "vmouseup" );
			this._sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this._sliderTarget = false;
			//if the track is the target remember this and the original value
			if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
				this._sliderTarget = true;
				this._targetVal = $( event.target ).val();
			}
		},

		_setOption: function( options ) {
			this._superApply( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			this._updateHighlight();
		},

		_change: function( event ) {
			if ( event.type === "keyup" ) {
				this._updateHighlight();
				return false;
			}

			var self = this,
				min = parseFloat( this._inputFirst.val(), 10 ),
				max = parseFloat( this._inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first ? this._inputFirst : this._inputLast,
				otherSlider = first ? this._inputLast : this._inputFirst;
			
			
			if( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" && !$(event.target).hasClass("ui-slider-handle")) ){
				thisSlider.blur();
			} else if( event.type === "mousedown" ){
				return;
			}
			if ( min > max && !this._sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
				this._trigger( "normalize" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extreme go to the closest handle
				thisSlider.val( this._targetVal ).slider( "refresh" );

				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					$.data( otherSlider.get(0), "mobileSlider" ).handle.focus();
					self._sliderFirst.css( "z-index", first ? "" : 1 );
					self._trigger( "normalize" );
				}, 0 );
				this._proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both _sliders are at min they cannot be adjusted
			if ( min === max ) {
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", 1 );
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", 0 );
			} else {
				$.data( otherSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
				$.data( thisSlider.get(0), "mobileSlider" ).handle.css( "z-index", "" );
			}
			
			this._updateHighlight();
			
			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( $.data( this._inputFirst.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				max = parseInt( $.data( this._inputLast.get(0), "mobileSlider" ).handle.get(0).style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_destroy: function() {
			this.element.removeClass( "ui-rangeslider ui-mini" ).find( "label" ).show();
			this._inputFirst.after( this._sliderFirst );
			this._inputLast.after( this._sliderLast );
			this._sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	});

$.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.behaviors.formReset );

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.rangeslider.prototype.enhanceWithin( e.target, true );
});

})( jQuery );

}));
