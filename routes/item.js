'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');

router.post('/', (req, res) => {
    console.log('add item: ', req.body);
    Item.create(req.body, (err, room) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(room);
    });
});
router.delete('/', (req, res) => {
    console.log('delete: ', req.body);
    Item.delete(req.body, (err, item) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(item);
    });
});
router.put('/', (req, res) => {
    console.log('update: ', req.body);
    Item.update(req.body, (err, item) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(item);
    });
});


module.exports = router;
