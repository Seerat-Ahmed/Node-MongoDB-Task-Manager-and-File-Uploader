const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const http = require('http');


/**
 * Uploading File
 */

router.post('/api/upload', (req, res) => {
    // Creating form object
    const form = new formidable.IncomingForm();
    let fileName = '';

    form.uploadDir = path.join(__dirname, '/upload');

    form.on('file', (field, file) => {
        fileName = file.name;
        fs.rename(file.path, path.join(form.uploadDir, file.name));;
    });

    form.on('error', (error) => {
        res.send('An error has occured', error);
        res.send();
    });

    form.on('end', () => {
        res.send(fileName);
        res.end('Success');
    });

    form.parse(req);
});

/**
 * Downloading Files
 */
router.get('/api/upload', (req, res) => {
    const files = fs.readdirSync(__dirname + '/upload');
    res.send(files);
    res.status(200);
    res.end();
});


/**
 * Send Download Attachments
 */

router.get('/api/upload/:filename', (req, res) => {
    res.sendFile(__dirname + '/upload/' + req.params.filename);
});


module.exports = router;