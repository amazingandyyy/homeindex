'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', (req, res) => {
    var callback = function(err, messages) {
        if (err) return res.status(404).send(err);
        res.send(messages);
    };
    Message.getAll(callback);
});




module.exports = router;
