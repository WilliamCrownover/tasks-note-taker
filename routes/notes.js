const notes = require('express').Router();
const uniqid = require('uniqid');
const { 
    readFromFile,
    writeToFile,
    appendToFile 
} = require('../utility/fsUtils');

const dbFilePath = './db/db.json';

notes.get('/', (req, res) => {
    readFromFile(dbFilePath)
        .then((data) => res.send(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uniqid()
    };

    appendToFile(newNote, dbFilePath);

    res.json('Note added successfully');
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile(dbFilePath)
        .then((data) => JSON.parse(data))
        .then((json) => {
            const noteRemoved = json.filter(note => note.id !== noteId);

            const dataJSON = JSON.stringify(noteRemoved, null, 4);

            writeToFile( dbFilePath, dataJSON );

            res.json('Note deleted successfully');
        });

})

module.exports = notes;