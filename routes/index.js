// I decided to use 'index.js' in the directory '/routes' so that I can easily route future api endpoints to other sub modules.

// Required modules
const express = require( 'express' );
const notesRouter = require( './notes' );

// Load Express.js to app
const app = express();

// Route /api/notes requests to notes.js
app.use( '/notes', notesRouter );

// Module export
module.exports = app;