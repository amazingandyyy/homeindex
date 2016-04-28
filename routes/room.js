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

// GET /api/rooms
router.get('/', (req, res) => {
    console.log('get a room of id: ', req.query);
    Item.getAll((err, items) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(items);
    });
});

router.delete('/:id', (req, res) => {
    console.log('delete: ', req.body);
    Room.delete(req.params.id, (err, room) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(room);
    });
});
// GET /api/rooms/32
router.get('/:id', (req, res) => {
    Room.getOne(req.params.id, function(err, room, items) {
        if(err) return req.status(400).send(err);

        res.send({
            room: room,
            items: items
        });
    })
    // Item.getOneRoom(req.params.id, (err, itemsOfRoom) => {
    //     if (err) return res.status(404).send(err);
    //     res.status(200).send(itemsOfRoom);
    // });
});


// router.put('/', (req, res) => {
//     console.log('update: ', req.body);
//     Room.update(req.body, (err, score) => {
//         if (err) return res.status(404).send(err);
//         res.send('update one score successfully');
//     });
// });


module.exports = router;
