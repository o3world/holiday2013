/*
 * O3 World Holiday Microsite 2013
 * 
 * Conditional loading of advanced JS based on MQ detection
 *  
 * Changelog:
 * 
 ************************************************************************************************/

/*
 * ClassIE
 * Detects versions of Internet Explorer
 *
 * Version     : 0.3.0
 * Author      : Aurélien Delogu (dev@dreamysource.fr)
 * Homepage    : https://github.com/pyrsmk/ClassIE
 * License     : MIT
 *
 */
this.IE=-1;/*@cc_on (function(a){var b=a.createElement("div"),c=function(a){b.innerHTML="<!--[if IE "+a+"]>1<![endif]-->";return b.innerHTML==1},d=6;if(!c("5.5000"))while(!c(d)&&++d<10);a.documentElement.className+=" ie"+d,this.IE=d})(document) @*/

/*
 * Global Variables
 *
 ************************************************************************************************/


// define MQ load test vars
var device = 'mobile-portrait',
	mq = jQuery( 'body' )[ 0 ],
	isIE = false;


/*
 * Custom Functions
 *
 ************************************************************************************************/


// function that grabs the current value of the after pseudo class of the #mediaquery <div> and loads JS assets conditionally
function deviceCheck( ) {
	
	if( isIE ) {
		device = 'desktop';
	} else {
		device = window.getComputedStyle( mq, ":after" ).getPropertyValue( "content" );
	
		if( device != 'mobile-portrait' ) {
						
			// plugin load
			jQuery.getScript( "js/plugins.min.js", function( ) {
				
				// functionality load
				jQuery.getScript( "js/funcs.min.js", function( ) {
					
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
			} );
		}
	}
};


/*
 * jQuery Actions
 *
 ************************************************************************************************/


/*
 * jQuery Window Resize
 *
 ************************************************************************************************/


/*
 * jQuery DOM Ready
 *
 ************************************************************************************************/


jQuery( document ).ready( function( ) {
	
	// if < IE9
	if( IE != -1 && IE != 10 ) {
		isIE = true;
	}
		
	// check the device mq on load
	deviceCheck( );
} );