const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// modules
const game = require('./game');

/**
 * Cors
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
* Send a POST request to localhost:3000/api/visitors with body
* { "rounds": [1,2,4,6,1,8,10,2,4,1] }
*/

app.post('/', (request, response) => {
  const rounds = request.body.rounds;
  // console.log(rounds);
  const pointsDifference = game(rounds).pointsDifference;
  response.json({ pointsDifference });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`To view your app, open this link in your browser: http://localhost: ${port}`);
});
