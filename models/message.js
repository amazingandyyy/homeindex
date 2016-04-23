'use strict';


var db = require('../config/db');
var uuid = require('uuid');
var moment = require('moment');
var timeStamp = moment().format('LLL');

db.run('CREATE TABLE IF NOT EXISTS messages (name text, body text, time text, id text)');

exports.create = function(message, cb) {
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO messages VALUES (?,?,?,?)");
        stmt.run(message.name, message.body, timeStamp, uuid());
        stmt.finalize(cb);
    });
};

exports.getAll = function(cb) {
    db.all('SELECT * FROM messages', cb)
};

exports.delete = function(message, cb) {
    console.log('id: ', message.id);
    // db.serialize(function() {
    //     var stmt = db.prepare(`DELETE FROM messages WHERE id = ${message.id}`);
    //     stmt.run(`DELETE FROM messages WHERE id = ${message.id}`);
    //     stmt.finalize(cb);
    // });
    db.run(`DELETE FROM messages WHERE id = '${message.id}'`, cb)
};

exports.update = function(message, cb) {
    db.run(`UPDATE messages SET name = '${message.name}', body = '${message.body}',time = '${timeStamp}' WHERE id = '${message.id}'`, cb)
};
