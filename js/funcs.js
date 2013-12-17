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


/*
 * Global Variables
 *
 ************************************************************************************************/



/*
 * Custom Functions
 *
 ************************************************************************************************/


var pm1 = jQuery( '#bg-1' );

jQuery( pm1 ).attr( 'data-' + ( jQuery( pm1 ).width( ) - jQuery( window ).width( ) ), 'left:-' + ( ( jQuery( pm1 ).width( ) - jQuery( window ).width( ) ) / 2 ) + 'px' );

var pm2 = jQuery( '#bg-2, #bg-panels' );

jQuery( pm2 ).attr( 'data-' + ( jQuery( pm2 ).width( ) - jQuery( window ).width( ) ), 'left:-' + ( jQuery( pm2 ).width( ) - jQuery( window ).width( ) ) + 'px' );


var preload;
var loadallfired = false;
var manifest = new Array();
var wdImgs = [ "images/bg-background.png", "images/bg-mid-1.png", "images/bg-mid-2.png", "images/bg-mid-3.png", "images/bg-mid-4.png", "images/bg-mid-5.png", "images/bg-mid-6.png", "images/bg-mid-7.png", "images/bg-mid-8.png", "images/bg-mid-9.png", "images/bkg-panel.png", "images/sprite-clouds.png", "images/sprite-people.png", "images/sprite-social.png" ];

function initPreloader( ) {
    
    reload( );
    loadAll( );
};

function reload( ) {
    
    if( preload != null ) {
        preload.close( );
    }
    
    preload = new createjs.LoadQueue( false );
    preload.addEventListener( 'error', handleFileError );
    preload.addEventListener( 'progress', handleOverallProgress );
    preload.setMaxConnections( 5 );
    
    manifest = wdImgs;
};


function loadAll( ) {
    
    while( manifest.length > 0 ) {
        loadAnother( );
    }
};

function loadAnother( ) {
    console.log( "here loadAnother" );
    var item = manifest.shift( );
    
    preload.loadFile( item );
}

function handleOverallProgress( event ) {
	
	if( preload.progress == 1 ) {
		
		var s = skrollr.init( {
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
				
		setTimeout( function( ) {
			jQuery( '#preload-container' ).fadeOut( 'slow' );
		}, 500 );
	}
};

function handleFileError( event ) {
    console.log( 'error loading asset' );
};






var scrollInterval/* , scrollDistance, scrollSpeed */ = 100; //touch controls

function moveScene( direction ) {
	
	scrollInterval = setInterval( function( ) {
		
		//scrollPos = -( currST + ( direction * 100 ) )
		
		jQuery( window ).scrollTop( jQuery( window ).scrollTop( ) + -( direction * 100 ) );
		
		//jQuery( window ).scrollTo( 0, '+=100px' );
		
		//currST = scrollPos;
		
		//console.log( "currST: " + currST );
		
		/*
scrollPos = -( currST + ( direction * 100 ) )
		
		myScroll.scrollTo( 0, scrollPos );
		
		skrollr.iscroll.scrollTo( 0, -( jQuery( window ).scrollTop( ) + ( direction * scrollDistance ) ), scrollSpeed );
				
		console.log( -( jQuery( window ).scrollTop( ) + ( direction * 100 ) ) );
*/
	}, 100 );
};

jQuery( '#scRight' ).bind( 'touchstart mousedown', function( ){
	clearInterval( scrollInterval );
	moveScene( -1 );
} );
jQuery( '#scRight' ).bind( 'touchend mouseup', function( ) {
	clearInterval( scrollInterval );
} );
jQuery( '#scLeft' ).bind( 'touchstart mousedown', function( ) {
	clearInterval( scrollInterval );
	moveScene( 1 );
} );
jQuery( '#scLeft' ).bind( 'touchend mouseup', function( ) {
	clearInterval( scrollInterval );
} );


/*
 * jQuery Actions
 *
 ************************************************************************************************/



/*
 * jQuery DOM Ready
 *
 ************************************************************************************************/


jQuery( document ).ready( function( ) {
	
	// preload content
	initPreloader( );
} );