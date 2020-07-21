const db = require('../models/setup');

function create(recipe) {
	let prefix = 'https://';
	let prefix2 = 'http://';
	let correct_link = recipe.link;
	console.log(correct_link);
	if (!((correct_link.substr(0, prefix.length) == prefix) || (correct_link.substr(0,prefix2.length) == prefix2))) {
	    correct_link = prefix2 + correct_link;
	}
	console.log(correct_link);
	return db.oneOrNone(`INSERT INTO recipes (name, link) VALUES ($1, $2) RETURNING *;`, [recipe.name, correct_link]);
}

function getAll() {
	return db.query(`SELECT * FROM recipes ORDER BY name`);
}

function getSome(list) {
	return db.query(`SELECT * FROM recipes WHERE id IN ${list}`);
}

module.exports = { create, getAll, getSome };