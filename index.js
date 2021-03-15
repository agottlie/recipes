const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//controller routes
app.use('/recipes', require('./controllers/recipeController'));
app.use('/ingredients', require('./controllers/ingredientController'));

//renders the landing page
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log('Server listening on port', PORT));
