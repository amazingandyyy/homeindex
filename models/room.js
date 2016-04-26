'use strict';


var db = require('../config/db');

exports.getAll = function(cb) {
    db.query(`SELECT * FROM rooms`,cb);
};

exports.create = function(room, cb) {
    db.query(`INSERT INTO rooms (name) VALUES ('${room.name}')`,cb);
};

exports.delete = function(score, cb) {
    console.log('id: ', score.id);
    db.run(`DELETE FROM scores WHERE id = '${score.id}'`, cb(null, {
        id: score.id
    }))
};

exports.update = function(score, cb) {
    db.run(`UPDATE scores SET name = '${score.name}', score = '${score.score}',total = '${score.total}' WHERE id = '${score.id}'`, cb)
};
