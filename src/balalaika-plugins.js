"use strict";
( function( $, s_classList ) {
	if( !$b ) {
		throw new Error( 'Balalaika is missing' );
	}
	
	$b.extend( $b.fn, {
		hasClass: function( className ) { return !!this[ 0 ] && this[ 0 ][ s_classList ].contains( className ); },
		addClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.add.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		removeClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.remove.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		toggleClass: function( className, b ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				if( typeof b !== 'boolean' ) {
					b = !classList.contains( className );
				}
				classList[ b ? 'add' : 'remove' ].apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		add: function( s ) {
			var result = $b( this );
			s = $b( s ).slice();
			[].push.apply( result, s );
			for( var i = result.length - s.length; i < result.length; i++ ) {
				if( result.indexOf( result[ i ] ) !== i ) {
					result.splice( i--, 1 );
				}
			}
			return result;
		},
		find: function( s ) {
			var result = $b();
			this.forEach( function( item ) {
				result = result.add( $b( s, item ) );
			});
			return result;
		}
	});
	
	// simple html parser
	$b.parseHTML = function( html ) {
		var node = document.createElement( 'div' ),
			// wrapMap is taken from jQuery
			wrapMap = {
					option: [ 1, "<select multiple='multiple'>", "</select>" ],
					legend: [ 1, "<fieldset>", "</fieldset>" ],
					thead: [ 1, "<table>", "</table>" ],
					tr: [ 2, "<table><tbody>", "</tbody></table>" ],
					td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
					col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
					area: [ 1, "<map>", "</map>" ],
					_: [ 0, "", "" ]
			},
			wrapper,
			i;
		
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
		
		wrapper = wrapMap[ /<([\w:]+)/.exec( html )[ 1 ] ] || wrapMap._;
		
		node.innerHTML = wrapper[ 1 ] + html + wrapper[ 2 ];
		
		i = wrapper[ 0 ];

		while( i-- ) {
			node = node.firstElementChild;
		}
		
		return $b( node.children );
	};
	
	
	
	// IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
	// This part of code will be removed in Matreshka 1.0
	(function( document, $, i, j, k, fn ) {
		if( document.documentMode < 9 ) {
			fn = $.i[ j = 'prototype' ];

			$.i = function( s, context ) {
				k = !s ? fn : s && s.nodeType || s === window ? [s] : "" + s === s ? /</.test( s ) ? ( ( i = document.createElement( 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : !function r(f){/in/(document.readyState)?setTimeout(r,9,f):f()}(s): s;
			
				j = []; for (i = k ? k.length : 0; i--; j[i] = k[i]) {}
				
				fn.push.apply( this, j );
			};
			
			$.i[ j ] = fn;
		}
		return $;
	})( document, $b );
	
	return $b;
})( window.$b, 'classList' ); 
