const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (content, filePath) => {
    fs.writeFile(filePath, content, (err) => {
        err ? console.log(err) : console.log("Success!")
    });
}

const appendToFile = (obj, filePath) => {
    readFromFile(filePath)
        .then((data) => {
            const parsedData = JSON.parse(data);
            parsedData.push(obj);
            const dataJSON = JSON.stringify(parsedData, null, 4);
            writeToFile(dataJSON, filePath);
        });
}

module.exports = { readFromFile, appendToFile };