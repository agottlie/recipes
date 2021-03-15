const db = require('../models/setup');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

function create(recipe) {
	let prefix = 'https://';
	let prefix2 = 'http://';
	let correct_link = recipe.link;


	if (!((correct_link.substr(0, prefix.length) == prefix) || (correct_link.substr(0,prefix2.length) == prefix2)) && (correct_link != "")) {
	    correct_link = prefix2 + correct_link;
	}
	return db.oneOrNone(`INSERT INTO recipes (name, link, type, date_last_eaten, page) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [recipe.name, correct_link, recipe.type, today, recipe.page]);
}

function getAll() {
	return db.query(`SELECT * FROM recipes ORDER BY date_last_eaten DESC`);
}

function getSome(list) {
	return db.query(`SELECT * FROM recipes WHERE id IN ${list} ORDER BY date_last_eaten DESC`);
}

function update(id) {
	return db.oneOrNone(`UPDATE recipes SET date_last_eaten='${today}' WHERE id=${id}`)
}

module.exports = { create, getAll, getSome, update };