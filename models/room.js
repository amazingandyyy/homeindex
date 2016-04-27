'use strict';


var db = require('../config/db');

exports.getAll = function(cb) {
    db.query(`SELECT * FROM rooms`,cb);
};

exports.create = function(room, cb) {
    console.log("create room", room);
    db.query(`INSERT INTO rooms SET ?`, room, cb);
};

exports.delete = function(room, cb) {
    console.log('id: ', room.id);
    db.query(`DELETE FROM rooms WHERE id = '${room.id}'`, cb(null, {
        id: room.id
    }));
};

// exports.update = function(room, cb) {
//     db.run(`UPDATE scores SET name = '${room.name}' WHERE id = '${room.id}'`, cb)
// };
