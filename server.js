// Required modules
const express = require( 'express' );
const path = require( 'path' );
const api = require( './routes/index.js' );

// Open port on Heroku or default to 3001;
const PORT = process.env.PORT || 3001;

// Load Express.js to app
const app = express();

// Middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ));

// Route /api requests to index.js
app.use( '/api', api );

// Open access to file directory 'public'
app.use( express.static( 'public' ) );

// Route to notes page
app.get( '/notes', ( req, res ) =>
  res.sendFile( path.join( __dirname, '/public/notes.html' ))
);

// Any undefined wildcard routes go back to index (Homepage)
app.get( '*', ( req, res ) =>
  res.sendFile( path.join( __dirname, '/public/index.html' ))
);

// Listening port
app.listen(PORT, () =>
  console.log( `Server open at http://localhost:${PORT}` )
);