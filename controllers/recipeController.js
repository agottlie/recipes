const Recipe = require('../models/recipes');
const Ingredient = require('../models/ingredients');
const router = require('express').Router();

router.post('/update', (req, res) => {
	Recipe
		.update(req.body.recipe)
		.then(data => {
			console.log("HI");
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
			console.log(data);
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
			let recipe=data;
			let entrees = [];
			let sauces = [];
			let sides = [];
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
			res.render('recipes/list', {entrees:entrees,sides:sides,sauces:sauces})
		})
		.catch(err => console.log('ERROR: ', err));
});


module.exports = router;