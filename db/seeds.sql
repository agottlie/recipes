DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;


CREATE TABLE recipes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	type VARCHAR(255),
	link VARCHAR(255),
	page VARCHAR(255),
	date_last_eaten DATE NOT NULL
);

CREATE TABLE ingredients (
 	id SERIAL PRIMARY KEY,
  	name VARCHAR(255),
  	recipe_id INTEGER REFERENCES recipes
);