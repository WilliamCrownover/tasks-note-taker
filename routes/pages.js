/* eslint-disable no-undef */
// Required modules
const router = require( 'express' ).Router();
const path = require( 'path' );

// Route to notes page
router.get( '/notes', ( req, res ) =>
	res.sendFile( path.join( __dirname, '/../public/notes.html' ) )
);

// Any undefined wildcard routes go back to index (Homepage)
router.get( '*', ( req, res ) =>
	res.sendFile( path.join( __dirname, '/../public/index.html' ) )
);

// Module export
module.exports = router;