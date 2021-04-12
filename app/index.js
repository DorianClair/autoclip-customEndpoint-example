const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const db = require('./queries')

const http = require('http');
const server = http.createServer(app);
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json()

// you only need to make one POST'able endpoint public
// here we expose `/submitanswers` so we would fill in the custom endpoint textbox with 'https://example.com/submitanswers'
app.post('/submitanswers', jsonParser, db.submitAnswers)

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running on: " + process.env.PORT));