const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();
const xmlGenerator = require('../modules/xml-generator');

router.post('/generate', (req, res) => {
    console.log('req.body HERE  XML : ', req.body);
    
    let xmlAPIS = xmlGenerator('foo');
    console.log("xmlApis is:", xmlAPIS);
    // res.sendStatus(201);
    res.send(xmlAPIS);
});

module.exports = router;