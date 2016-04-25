'use strict';

var express = require('express');
var router = express.Router();
var Score = require('../models/score');


router.get('/', (req, res, next) => {
    Score.getAll((err, scores) => {
        // console.log("messages2: ", messages);
        if (err) return res.status(404).send('cannot find the score');
        var scores = scores.reverse();
        // console.log(messages);
        res.render('sheet', {
            title: "Board",
            theme: "readable",
            active: "active",
            scores: scores
        });
    });
});

router.use('/score', require('./score'));
// router.use('/delete', require('./delete'));
// router.use('/update', require('./update'));
// router.use('/find', require('./find'));

module.exports = router;
