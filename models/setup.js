pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://andrew.gottlieb@localhost:5432/recipes');

module.exports = db;