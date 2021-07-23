// Required modules
const notes = require( 'express' ).Router();
const uniqid = require( 'uniqid' );
const { 
    readFromFile,
    writeToFile,
    appendToFile 
} = require( '../utility/fsUtils' );

// Global variable pointing to database json file
const dbFilePath = './db/db.json';

// Get sends back JSON parsed file
notes.get( '/', ( req, res ) => {
    readFromFile( dbFilePath )
        .then(( data ) => res.send( JSON.parse( data )));
});

// Post appends a new note to database file
notes.post( '/' , ( req, res ) => {
    console.log( 'New Note Contents', req.body );

    // Deconstruct incomming note object
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uniqid()
    };

    appendToFile( newNote, dbFilePath );

    console.log( 'Note added successfully' );
    res.json( 'Note added successfully' );
});

// Delete removes a note using its id parameter from the database file
notes.delete( '/:id', ( req, res ) => {
    const noteId = req.params.id;

    readFromFile( dbFilePath )
        .then(( data ) => JSON.parse( data ))
        .then(( json ) => {
            const noteRemoved = json.filter( note => note.id !== noteId );
            const dataJSON = JSON.stringify( noteRemoved, null, 4 );

            writeToFile( dbFilePath, dataJSON );

            console.log( 'Note deleted successfully' );
            res.json( 'Note deleted successfully' );
        });
})

// Module export
module.exports = notes;