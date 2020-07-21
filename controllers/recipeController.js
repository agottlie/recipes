const Recipe = require('../models/recipes');
const Ingredient = require('../models/ingredients');
const router = require('express').Router();

router.get('/new', (req, res) => {
	res.render('recipes/new');
});

router.get('/list', (req, res) => {
	let ingredients;
	Ingredient
		.getAll()
		.then(data => {
			ingredients=data;
			return Recipe.getAll();
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
			res.render('recipes/list', {recipe: recipe})
		})
		.catch(err => console.log('ERROR: ', err));
});

router.post('/', (req, res) => {
	Recipe
		.create(req.body.recipe)
		.then(recipe => {
			return Ingredient.addAll(req.body.recipe, recipe.id);
		})
		.then(data => res.redirect('/recipes/list'))
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;