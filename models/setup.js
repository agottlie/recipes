pgp = require('pg-promise')();


let ssl = null;
if (process.env.NODE_ENV === 'development') {
   ssl = {rejectUnauthorized: false};
}

const config = {
   host: 'localhost',
   port: 5432,
   database: 'dcj3qa2r6sd8pl',
   user: 'wrdjznzsfqmdpp',
   password: 'd7b7bb2784157fecbd1d2b9364e60d143a7861878db666e4e109a16d4c300a39',
   max: 30, // use up to 30 connections
   ssl:ssl
};

const db = pgp(config);

module.exports = db;