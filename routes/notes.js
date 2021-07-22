const notes = require('express').Router();
const uniqid = require('uniqid');
const { 
    readFromFile,
    appendToFile 
} = require('../utility/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
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

    appendToFile(newNote, './db/db.json');

    res.json('Note added successfully');
});

module.exports = notes;