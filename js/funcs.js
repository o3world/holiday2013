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
	var theImages = [ "images/bg-background.png", "images/bg-mid-1.png", "images/bg-mid-2.png", "images/bg-mid-3.png", "images/bg-mid-4.png", "images/bg-mid-5.png", "images/bg-mid-6.png", "images/bg-mid-7.png", "images/bg-mid-8.png", "images/bg-mid-9.png", "images/bkg-panel.png", "images/bkg-snow-foreground.png", "images/bkg-snow-midground.png", "images/sprite-clouds.png", "images/sprite-people.png", "images/sprite-social.png", "images/TEMP-elements.png", "images/touch-divider.gif" ];
} else {

	// set default image list
	var theImages = [ "images/bg-background.png", "images/bg-mid-1.png", "images/bg-mid-2.png", "images/bg-mid-3.png", "images/bg-mid-4.png", "images/bg-mid-5.png", "images/bg-mid-6.png", "images/bg-mid-7.png", "images/bg-mid-8.png", "images/bg-mid-9.png", "images/bkg-panel.png", "images/bkg-snow-foreground.png", "images/bkg-snow-midground.png", "images/sprite-clouds.png", "images/sprite-people.png", "images/sprite-social.png", "images/TEMP-elements.png", "images/touch-divider.gif" ];
}

// define skrollr var
var s;

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



function moveScene( direction ) {
	
	scrollInterval = setInterval( function( ) {

		jQuery( window ).scrollTop( jQuery( window ).scrollTop( ) + -( direction * 100 ) );
	}, 100 );
};


/*
 * jQuery Actions
 *
 ************************************************************************************************/


// variable for background container
var pm1 = jQuery( '#bg-1' );

// assign data and parallax math on page load for background
jQuery( pm1 ).attr( 'data-' + ( jQuery( pm1 ).width( ) - jQuery( window ).width( ) ), 'left:-' + ( ( jQuery( pm1 ).width( ) - jQuery( window ).width( ) ) / 2 ) + 'px' );

// varaible for midground container
var pm2 = jQuery( '#bg-2, #bg-panels' );

// assign data and parallax math on page load for midground
jQuery( pm2 ).attr( 'data-0', 'right:-' + ( jQuery( pm2 ).width( ) - jQuery( window ).width( ) ) + 'px' );
jQuery( pm2 ).attr( 'data-6600', 'right:0px' );


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
		
		// reset parallax data attrs
		jQuery( pm2 ).attr( 'data-0', 'right:-' + ( jQuery( pm2 ).width( ) - jQuery( window ).width( ) ) + 'px' );
		
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
} );