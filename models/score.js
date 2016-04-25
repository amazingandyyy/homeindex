'use strict';


var db = require('../config/db');

db.run('CREATE TABLE IF NOT EXISTS scores (name text, score integer, total integer, id text)');

exports.create = function(score, cb) {
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO scores VALUES (?,?,?,?)");
        stmt.run(score.name, score.score, score.total, score.id);
        stmt.finalize(cb(null, {
            name: score.name,
            score: score.score,
            total: score.total,
            id: score.id
        }));
    });
};

exports.getAll = function(cb) {
    db.all('SELECT * FROM scores', cb)
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
