'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Item = require('../models/item');
var rooms;


router.get('/', (req, res, next) => {
    Room.getAll((err, rooms) => {
        // console.log("messages2: ", messages);
        if (err) return res.status(404).send('cannot find rooms');
        res.render('home', {
                title: "Home",
                theme: "readable",
                active: "active",
                rooms: rooms,
            });
        // rooms = rooms.reverse();
        // Item.getAll((err, items) => {
        //     if (err) return res.status(404).send('cannot find items');
        //     items = items.reverse();
        //     res.render('home', {
        //         title: "Home",
        //         theme: "readable",
        //         active: "active",
        //         rooms: rooms,
        //         items: items
        //     });
        // })
    });
});

router.use('/room', require('./room'));
router.use('/item', require('./item'));
// router.use('/delete', require('./delete'));
// router.use('/update', require('./update'));
// router.use('/find', require('./find'));

module.exports = router;
