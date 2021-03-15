const Recipe = require('../models/recipes');
const Ingredient = require('../models/ingredients');
const router = require('express').Router();

router.post('/update', (req, res) => {
	Recipe
		.update(req.body.recipe)
		.then(data => {
			res.redirect('/recipes/list');
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
});

router.get('/new', (req, res) => {
	res.render('recipes/new');
});

router.get('/update', (req, res) => {
	Recipe
		.getAll()
		.then(data => {
			let recipes=data;
			res.render('recipes/update', {recipes:recipes});
		})
})

router.get('/list', (req, res) => {
	let ingredients;
	Ingredient
		.getAll()
		.then(data => {
			ingredients=data;
			return Recipe.getAll();
		})
		.then(data => {
			let recipes = {
				types: [
					{
						name: "Entrees",
						recipe_list: []
					},
					{
						name: "Sides",
						recipe_list: []
					},
					{
						name: "Sauces",
						recipe_list: []
					}
				]
			}
			for (let i=0; i<data.length; i++) {
				data[i].date_last_eaten = data[i].date_last_eaten.toString().slice(4,15);
				data[i].ingredients = []
				for (let j=0; j<ingredients.length; j++) {
					if (ingredients[j].recipe_id == data[i].id) {
						data[i].ingredients.push(ingredients[j].name);
					}
				}
				if (data[i].type == "entree") {
					recipes.types[0].recipe_list.push(data[i]);
				} else if (data[i].type == "side") {
					recipes.types[1].recipe_list.push(data[i]);
				} else if (data[i].type == "sauce") {
					recipes.types[2].recipe_list.push(data[i]);
				}
			}
			console.log(recipes);
			res.render('recipes/list', {recipes: recipes})
		})
		.catch(err => console.log('ERROR: ', err));
});


module.exports = router;