const Ingredient = require('../models/ingredients');
const Recipe = require('../models/recipes');
const router = require('express').Router();
let entrees = [];
let sauces = [];
let sides = [];
let ingredient_name;

router.get('/search', (req, res) => {
	res.render('ingredients/search');
});

router.get('/list', (req, res) => {
	res.render('ingredients/list', {entrees:entrees,sides:sides,sauces:sauces,name:ingredient_name});
})

router.get('/:name', (req, res) => {
	const name=req.params.name;
	let ingredients;
	Ingredient
		.getAll()
		.then(data => {
			ingredients=data;
			return Ingredient.search(name)
		})
		.then(data => {
			if (data.length > 0) {
				ingredient_name = data[0].name;
				recipe_list = "(" + data[0].recipe_id;
				for (i=1;i<data.length;i++) {
					recipe_list = recipe_list + "," + data[i].recipe_id;
				}
				recipe_list = recipe_list + ")"
			} else {
				ingredient_name = name;
				recipe_list = "(-1)";
			}
			return Recipe.getSome(recipe_list)
		})
		.then(data => {
			let recipe=data;
			for (let i=0; i<recipe.length; i++) {
				recipe[i].date_last_eaten = recipe[i].date_last_eaten.toString().slice(4,15);
				recipe[i].ingredients = []
				for (let j=0; j<ingredients.length; j++) {
					if (ingredients[j].recipe_id == recipe[i].id) {
						recipe[i].ingredients.push(ingredients[j].name);
					}
				}
				if (recipe[i].type == "entree") {
					entrees.push(recipe[i]);
				} else if (recipe[i].type == "sauce") {
					sauces.push(recipe[i]);
				} else if (recipe[i].type == "side") {
					sides.push(recipe[i]);
				}
			}
			res.render('ingredients/list')
		})
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;