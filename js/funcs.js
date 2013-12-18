/*
 * O3 World Holiday Microsite 2013
 * 
 * Custom Vanilla Javascript and jQuery Functions
 *  
 * Changelog:
 * 
 ************************************************************************************************/


// avoid Console errors in browsers that lack a console... I'm looking at you IE
if ( !( window.console && console.log ) ) {
    ( function( ) {
        var noop = function( ) { };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = { };
        while ( length-- ) {
            console[ methods[ length ] ] = noop;
        };
    } ( ) );
};


// output useragent name and version to the Console
var N = navigator.appName,
    ua = navigator.userAgent,
    tem;
var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
console.log('Browser: ' + M[0] + " " + M[1]);


// function assigned to var for minimizing resize event calls - StackOverflow
var waitForFinalEvent = ( function( ) {

	var timers = { };
	
	return function( callback, ms, uniqueId ) {
		if( !uniqueId ) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if( timers[ uniqueId ] ) {
			clearTimeout( timers[ uniqueId ] );
		}
		timers[ uniqueId ] = setTimeout( callback, ms );
	};
} ) ( );


/*
 * Global Variables
 *
 ************************************************************************************************/


// define preloader varaibles
var preload;
var loadallfired = false;
var manifest = new Array( );

// conditional var for determining load of default or retina assets
if( window.devicePixelRatio >= 1.5 ) {
	
	// set retina image list
	var theImages = [ "images/bg-back-1@2x.png", "images/bg-back-2@2x.png", "images/bg-back-3@2x.png", "images/bg-back-4@2x.png", "images/bg-mid-1@2x.png", "images/bg-mid-2@2x.png", "images/bg-mid-3@2x.png", "images/bg-mid-4@2x.png", "images/bg-mid-5@2x.png", "images/bg-mid-6@2x.png", "images/bg-mid-7@2x.png", "images/bg-mid-8@2x.png", "images/bg-mid-9@2x.png", "images/bkg-panel@2x.png", "images/bkg-snow-foreground@2x.png", "images/bkg-snow-midground@2x.png", "images/sprite-clouds@2x.png", "images/sprite-people@2x.png", "images/sprite-social@2x.png", "images/midground-elem-1@2x.png", "images/midground-elem-2@2x.png", "images/midground-elem-3@2x.png", "images/midground-elem-4@2x.png", "images/midground-elem-5@2x.png", "images/midground-elem-6@2x.png", "images/midground-elem-7@2x.png", "images/touch-divider@2x.gif" ];
} else {

	// set default image list
	var theImages = [ "images/bg-back-1.png", "images/bg-back-2.png", "images/bg-back-3.png", "images/bg-back-4.png", "images/bg-mid-1.png", "images/bg-mid-2.png", "images/bg-mid-3.png", "images/bg-mid-4.png", "images/bg-mid-5.png", "images/bg-mid-6.png", "images/bg-mid-7.png", "images/bg-mid-8.png", "images/bg-mid-9.png", "images/bkg-panel.png", "images/bkg-snow-foreground.png", "images/bkg-snow-midground.png", "images/sprite-clouds.png", "images/sprite-people.png", "images/sprite-social.png", "images/midground-elem-1.png", "images/midground-elem-2.png", "images/midground-elem-3.png", "images/midground-elem-4.png", "images/midground-elem-5.png", "images/midground-elem-6.png", "images/midground-elem-7.png", "images/touch-divider.gif" ];
}

// define skrollr var
var s;

// define parallax element vars
var parallaxBG = jQuery( '#bg-1' ); // background
var parallaxMG = jQuery( '#bg-2, #bg-panels' ); // midground; panels

// define interval for touch/mousedown scrolling
var scrollInterval = 100;


/*
 * Custom Functions
 *
 ************************************************************************************************/


// function to initialize preloader
function initPreloader( ) {

	// call preload init
	reload( );
	
	// start asset loading
	loadAll( );
};

// function for for creating preloader instance and assigning listerners
function reload( ) {
    
    // kill existing preloader
    if( preload != null ) {
        preload.close( );
    }
    
    // define preloader
    preload = new createjs.LoadQueue( false );
    preload.addEventListener( 'error', handleFileError );
    preload.addEventListener( 'progress', handleOverallProgress );
    preload.setMaxConnections( 5 );
    
    // assign asset queue for loading
    manifest = theImages;
};

// function to kick off asset loading
function loadAll( ) {
    
    // load new asset while there are more to load
    while( manifest.length > 0 ) {
        loadAnother( );
    }
};

// function for loading next asset in array
function loadAnother( ) {
    
    console.log( "here loadAnother" );
    
    // cycle forward in asset array
    var item = manifest.shift( );
    
    // load new item
    preload.loadFile( item );
}

// function defining load progress handler
function handleOverallProgress( event ) {
	
	// when load is complete
	if( preload.progress == 1 ) {
		
		// set-up skrollr instance
		s = skrollr.init( {
			forceHeight: true,
			smoothScrolling: true,
			easing: {
				vibrate: function( p ) {
					return Math.sin( p * 10 * Math.PI );
				}
			},
			render: function( info ) {
				currST = 0;
			}
		} );
		
		// fadeout the preloader
		setTimeout( function( ) {
			jQuery( '#preload-container' ).fadeOut( 'slow' );
		}, 500 );
	}
};


// function to display load error in console
function handleFileError( event ) {
    console.log( 'error loading asset' );
};


// function to recalculate parallax data attributes
function calculateParallaxData( ) {

	jQuery( parallaxBG ).attr( 'data-0', 'right:-' + ( jQuery( parallaxBG ).width( ) - jQuery( window ).width( ) ) / 3 + 'px;' );
	
	jQuery( parallaxMG ).attr( 'data-0', 'right:-' + ( jQuery( parallaxMG ).width( ) - jQuery( window ).width( ) ) + 'px;' );
};


// function to move scene proper direction
function moveScene( direction ) {
	
	// define scroll interval function
	scrollInterval = setInterval( function( ) {
		
		// set new scrollTop position 
		jQuery( window ).scrollTop( jQuery( window ).scrollTop( ) + -( direction * 50 ) );
	}, 100 );
};


/*
 * jQuery Actions
 *
 ************************************************************************************************/


// define scroll actions for touch/mousedown interactions
jQuery( '#scrollRight' ).bind( 'touchstart mousedown', function( ) {
	clearInterval( scrollInterval );
	moveScene( -1 );
} );

jQuery( '#scrollRight' ).bind( 'touchend mouseup', function( ) {
	clearInterval( scrollInterval );
} );

jQuery( '#scrollLeft' ).bind( 'touchstart mousedown', function( ) {
	clearInterval( scrollInterval );
	moveScene( 1 );
} );

jQuery( '#scrollLeft' ).bind( 'touchend mouseup', function( ) {
	clearInterval( scrollInterval );
} );


/*
 * jQuery Window Resize
 *
 ************************************************************************************************/


jQuery( window ).resize( function( ) {
	
	// recalculate parallax layer positions on resize
	waitForFinalEvent( function( ) {
		
		console.log( "bitches!" );
		
		// recalculate parallax data attributes
		calculateParallaxData( );
		
		// refresh skrollr math
		s.refresh( );
	}, 500, "some unique string" );
} );



/*
 * jQuery DOM Ready
 *
 ************************************************************************************************/


jQuery( document ).ready( function( ) {
	
	// preload image assets; init site
	initPreloader( );
	
	
	// define static parallax data element
	jQuery( parallaxBG ).attr( 'data-6600', 'right:0px;' );
	jQuery( parallaxMG ).attr( 'data-6600', 'right:0px;' );
	
	// set initial parallax element data positions
	calculateParallaxData( );
	
	
	// modernizr test for touch device to determine screen text
	if( Modernizr.touch ) {
		
		// is touch
		jQuery( '.arrow-left' ).after( 'Touch to Move Left' );
		jQuery( '.arrow-right' ).before( 'Touch to Move Right' );
	} else {
		
		// not touch
		jQuery( '.arrow-left' ).after( 'Click/Scroll to Move Left' );
		jQuery( '.arrow-right' ).before( 'Click/Scroll to Move Right' );
	}
} );