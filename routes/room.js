'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');

router.post('/', (req, res) => {
    console.log('add: ', req.body);
    Room.create(req.body, (err, room) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(room);
    });
});
// router.delete('/', (req, res) => {
//     console.log('delete: ', req.body);
//     Room.delete(req.body, (err, score) => {
//         if (err) return res.status(404).send(err);
//         res.status(200).send(score);
//     });
// });
// router.put('/', (req, res) => {
//     console.log('update: ', req.body);
//     Room.update(req.body, (err, score) => {
//         if (err) return res.status(404).send(err);
//         res.send('update one score successfully');
//     });
// });


module.exports = router;
