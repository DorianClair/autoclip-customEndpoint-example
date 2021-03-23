const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const db = require('./queries')

const http = require('http');
const server = http.createServer(app);
const port = 3000;

// create application/json parser
//small change 2
var jsonParser = bodyParser.json()

app.post('/manager', jsonParser, db.createManager);
app.get('/manager', jsonParser, db.getManagerById)
app.post('/user', jsonParser, db.createUser);
app.get('/user', jsonParser, db.getUserById)
app.post('/form', jsonParser, db.createForm);
app.get('/allquestions', jsonParser, db.getQuestionsByUserId);
app.get('/allquestionsbymanager', jsonParser, db.getQuestionsByUserId);
app.get('/login', jsonParser, db.logIn);
app.get('/questions', jsonParser, db.getQuestionsByFormId);
app.get('/users', jsonParser, db.getUsersByManagerId)

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running on: " + process.env.PORT));