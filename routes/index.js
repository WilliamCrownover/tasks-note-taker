// I decided to use 'index.js' in the directory '/routes' so that I can easily route future endpoints to other sub modules.

// Required modules
const router = require( 'express' ).Router();
const notesRouter = require( './notes' );
const pagesRouter = require( './pages' );

// Route /api/notes requests to notes.js
router.use( '/api/notes', notesRouter );
router.use( '/', pagesRouter );

// Module export
module.exports = router;