pgp = require('pg-promise')();

let pgdb = {
    type: "postgres",
    host: "ec2-52-204-232-46.compute-1.amazonaws.com",
    port: 5432,
    username: "wrdjznzsfqmdpp",
    password:
      "d7b7bb2784157fecbd1d2b9364e60d143a7861878db666e4e109a16d4c300a39",
    database: "dcj3qa2r6sd8pl",
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    }
 };

var db = pgp(pgdb);

module.exports = db;