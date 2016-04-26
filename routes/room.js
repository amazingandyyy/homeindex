'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Item = require('../models/item');

router.post('/', (req, res) => {
    console.log('add a room: ', req.body);
    Room.create(req.body, (err, room) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(room);
    });
});

router.get('/', (req, res) => {
    console.log('get a room of id: ', req.query);
    Item.getAll((err, items) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(items);
    });
});

router.get('/getSpecificRoom', (req, res) => {
    console.log('get a room of id: ', req.query);
    Item.getOneRoom(req.query, (err, itemsOfRoom) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(itemsOfRoom);
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
