'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');


router.get('/', (req, res, next) => {
    Room.getAll((err, rooms) => {
        // console.log("messages2: ", messages);
        if (err) return res.status(404).send('cannot find rooms');
        var rooms = rooms.reverse();
        // console.log(messages);
        res.render('home', {
            title: "Home",
            theme: "readable",
            active: "active",
            rooms: rooms
        });
    });
});

router.use('/room', require('./room'));
// router.use('/delete', require('./delete'));
// router.use('/update', require('./update'));
// router.use('/find', require('./find'));

module.exports = router;
