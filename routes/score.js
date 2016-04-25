'use strict';

var express = require('express');
var router = express.Router();
var Score = require('../models/score');

router.post('/', (req, res) => {
    console.log('add: ', req.body);
    Score.create(req.body, (err, score) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(score);
    });
});
router.delete('/', (req, res) => {
    console.log('delete: ', req.body);
    Score.delete(req.body, (err, score) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(score);
    });
});
router.put('/', (req, res) => {
    console.log('update: ', req.body);
    Score.update(req.body, (err, score) => {
        if (err) return res.status(404).send(err);
        res.send('update one score successfully');
    });
});


module.exports = router;
