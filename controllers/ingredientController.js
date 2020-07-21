const Ingredient = require('../models/ingredients');
const Recipe = require('../models/recipes');
const router = require('express').Router();
let ingredientData = {};
let ingredient_name;

router.get('/search', (req, res) => {
	res.render('ingredients/search');
});

router.get('/list', (req, res) => {
	res.render('ingredients/list', {data:ingredientData, name:ingredient_name});
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
				recipe[i].ingredients = []
				for (let j=0; j<ingredients.length; j++) {
					if (ingredients[j].recipe_id == recipe[i].id) {
						recipe[i].ingredients.push(ingredients[j].name);
					}
				}
			}
			ingredientData = recipe;
			res.render('ingredients/list')
		})
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;