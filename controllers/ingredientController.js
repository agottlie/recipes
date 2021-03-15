const Ingredient = require('../models/ingredients');
const Recipe = require('../models/recipes');
const router = require('express').Router();
let recipes = {
	types: []
};
let ingredient_name;

router.get('/search', (req, res) => {
	res.render('ingredients/search');
});

router.get('/list', (req, res) => {
	res.render('ingredients/list', {recipes:recipes,ingredient_name:ingredient_name});
})

router.get('/:name', (req, res) => {
	let ingredients;
	recipes.types = [
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
	Ingredient
		.getAll()
		.then(data => {
			ingredients=data;
			ingredient_name = req.params.name;
			return Ingredient.search(req.params.name)
		})
		.then(data => {
			let recipe_list="";
			console.log(data);
			if (data.length > 0) {
				recipe_list = "(" + data[0].recipe_id;
				for (i=1;i<data.length;i++) {
					recipe_list = recipe_list + "," + data[i].recipe_id;
				}
				recipe_list = recipe_list + ")"
			} else {
				recipe_list = "(-1)";
			}
			return Recipe.getSome(recipe_list)
		})
		.then(data => {
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
			res.render('ingredients/list')
		})
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;