'use strict';

var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'amazingandyyyM1!',
  database : 'homeinventorydb'
});

db.connect();

// db.query(`CREATE TABLE IF NOT EXISTS rooms (
//             id int PRIMARY KEY AUTO_INCREMENT,
//             name TEXT
//         )`);
// db.query(`CREATE TABLE IF NOT EXISTS items (
//             id int PRIMARY KEY AUTO_INCREMENT,
//             name TEXT,
//             value int,
//             category TEXT,
//             room int
//         )`);
//
// db.end();


module.exports = db;
