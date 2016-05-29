'use strict';


var db = require('../config/db');

exports.getAll = function(cb) {
    db.query(`SELECT * FROM rooms`,cb);
};

exports.getOne = function(id, cb) {
    db.query('SELECT * FROM rooms WHERE id=?', id, function(err, rooms) {
        if(err) return cb(err);

        db.query('SELECT * FROM items WHERE room=?', id, function(err, items) {
            if(err) return cb(err);
            cb(null, rooms[0], items);

        })

    })
}

exports.create = function(room, cb) {
    console.log("create room", room);
    db.query(`INSERT INTO rooms SET ?`, room, cb);
};

exports.delete = function(id, cb) {
    console.log('checked');
    console.log('id: ', id);
    // db.query(`DELETE FROM items WHERE room = '${room.id}'`);
    // db.query(`DELETE FROM rooms WHERE id = '${room.id}'`, cb(null, {
    //     id: room.id
    // }));
};

// exports.update = function(room, cb) {
//     db.run(`UPDATE scores SET name = '${room.name}' WHERE id = '${room.id}'`, cb)
// };
