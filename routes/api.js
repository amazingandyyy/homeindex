'use strict';

var express = require('express');
var router = express.Router();

router.use('/messages', require('./messages'));
router.use('/message', require('./message'));
// router.use('/delete', require('./delete'));
// router.use('/update', require('./update'));
// router.use('/find', require('./find'));

module.exports = router;
