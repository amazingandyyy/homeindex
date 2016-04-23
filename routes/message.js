'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.post('/', (req, res) => {
    console.log(req.query);
    Message.create(req.query, (err, message) => {
        if (err) return res.status(404).send(err);
        res.send('add one successfully');
    });
});
router.delete('/', (req, res) => {
    console.log(req.query);
    Message.delete(req.query, (err, message) => {
        if (err) return res.status(404).send(err);
        res.send('delete one successfully');
    });
});
router.put('/', (req, res) => {
    console.log(req.query);
    Message.update(req.query, (err, message) => {
        if (err) return res.status(404).send(err);
        res.send('update one successfully');
    });
});


module.exports = router;
