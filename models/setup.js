pgp = require('pg-promise')();


//for localhost
// var db = pgp(process.env.DATABASE_URL || 'postgres://andrewgottlieb@localhost:5432/recipes');



// for render
const config = {
   host: 'dpg-cteb0i56l47c73b8ibtg-a',
   port: 5432,
   database: 'recipes_jqcm',
   user: 'recipes_jqcm_user',
   password: 'mHyLWXEGLGSN2gAOXNEzUaKibb1u2xy0',
   max: 30, // use up to 30 connections
   ssl: {
        rejectUnauthorized: false,
        require: true
   }
};
const db = pgp(config);



module.exports = db;