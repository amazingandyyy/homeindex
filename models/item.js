'use strict';


var db = require('../config/db');

exports.getAll = function(cb) {
    db.query(`SELECT * FROM items`,cb);
};

exports.getOneRoom = function(room,cb) {
        db.query(`SELECT items.name, items.value, items.id FROM items INNER JOIN rooms ON items.room=rooms.id WHERE rooms.id=${room.id};`,cb);
};

exports.create = function(item, cb) {
    console.log("create item", item);
    db.query(`INSERT INTO items (name, value, room) VALUES ('${item.name}' , '${item.value}', '${item.room}')`,cb);
};

exports.delete = function(item, cb) {
    console.log('id: ', score.id);
    db.run(`DELETE FROM scores WHERE id = '${item.id}'`, cb(null, {
        id: score.id
    }))
};

exports.update = function(item, cb) {
    db.run(`UPDATE scores SET name = '${item.name}', value = '${item.value}' WHERE id = '${item.id}'`, cb)
};
