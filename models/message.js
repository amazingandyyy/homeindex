'use strict';


var db = require('../config/db');
var moment = require('moment');
var timeStamp = moment().format('LLL');

db.run('CREATE TABLE IF NOT EXISTS messages (name text, body text, time text, id text)');

exports.create = function(message, cb) {
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO messages VALUES (?,?,?,?)");
        stmt.run(message.name, message.body, message.time, message.id);
        stmt.finalize(cb(null, {
            name: message.name,
            body: message.body,
            time: message.time,
            id: message.id
        }));
    });
};

exports.getAll = function(cb) {
    db.all('SELECT * FROM messages', cb)
};

exports.delete = function(message, cb) {
    console.log('id: ', message.id);
    db.run(`DELETE FROM messages WHERE id = '${message.id}'`, cb(null, {
        id: message.id
    }))
};

exports.update = function(message, cb) {
    db.run(`UPDATE messages SET name = '${message.name}', body = '${message.body}',time = '${message.time}' WHERE id = '${message.id}'`, cb)
};
