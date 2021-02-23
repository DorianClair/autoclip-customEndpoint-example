const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const db = require('./queries')

const http = require('http');
const server = http.createServer(app);
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json()

app.get('/users', db.getUsers);
app.post('/user', jsonParser, db.createUser);
app.post('/manager', jsonParser, db.createManager);
app.post('/form', jsonParser, db.createForm);
app.get('/user', jsonParser, db.getQuestionsByUserId);
app.get('/login', jsonParser, db.logIn);

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running on: " + process.env.PORT));