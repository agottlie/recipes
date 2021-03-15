const db = require('../models/setup');

function addAll(recipe, id) {
	let ingredient_list = recipe.ingredients.split(',');
	let ingredient_st = "('" + ingredient_list[0].toLowerCase() + "'," + id + ")";
	for (let i=1; i<ingredient_list.length; i++) {
		ingredient_st += ", ('" + ingredient_list[i].toLowerCase() + "'," + id + ")";
	}
	return db.manyOrNone(`INSERT INTO ingredients (name, recipe_id) VALUES ${ingredient_st} RETURNING *;`);
}

function getAll() {
	return db.query(`SELECT * FROM ingredients ORDER BY name`);
}

function search(ingredient) {
	if (ingredient[ingredient.length-1] == "s") {
		ingredient = ingredient.slice(0,-1);
	}
	return db.query(`SELECT * FROM ingredients WHERE name LIKE '%${ingredient}%'`);
}

module.exports = { addAll, getAll, search };