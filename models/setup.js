pgp = require('pg-promise')();


//for localhost
var db = pgp(process.env.DATABASE_URL || 'postgres://andrew.gottlieb@localhost:5432/recipes');



//for heroku
// const config = {
//    host: 'ec2-52-204-232-46.compute-1.amazonaws.com',
//    port: 5432,
//    database: 'dcj3qa2r6sd8pl',
//    user: 'wrdjznzsfqmdpp',
//    password: 'd7b7bb2784157fecbd1d2b9364e60d143a7861878db666e4e109a16d4c300a39',
//    max: 30, // use up to 30 connections
//    ssl: {
//         rejectUnauthorized: false,
//         require: true
//    }
// };
// const db = pgp(config);



module.exports = db;