'use strict';


var db = require('../config/db');

exports.getAll = function(cb) {
    db.query(`SELECT * FROM items`,cb);
};

exports.getOneRoom = function(id,cb) {
    db.query(`SELECT items.name, items.value, items.category, items.id FROM items INNER JOIN rooms ON items.room=rooms.id WHERE rooms.id=${id};`, cb);
};

exports.create = function(item, cb) {
    console.log("create item", item);
    db.query(`INSERT INTO items (name, value, category, room) VALUES ('${item.name}' , '${item.value}', '${item.category}', '${item.room}')`, cb);
};

exports.delete = function(id, cb) {
    console.log('id: ', id);
    db.query(`DELETE FROM items WHERE id = '${id}'`, cb)
};

exports.update = function(item, cb) {
    db.query(`UPDATE items SET name = '${item.name}', value = '${item.value}', category = '${item.category}' WHERE id = '${item.id}'`, cb)
};
