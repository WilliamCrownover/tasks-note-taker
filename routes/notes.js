const notes = require('express').Router();
const { readFromFile } = require('../utility/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;