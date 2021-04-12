const Pool = require('pg').Pool

// here is an example configuration for a postgres database connection, but you will replace this with whatever database you want to store your answers in
const pool = new Pool({
  user: 'exampleUser', //E.G 'postgresDBUser2'
  host: 'exampleHost', //E.G 'ec2-100-24-139-146.compute-1.amazonaws.com'
  database: 'exampleDatabaseName', //E.G 'postgresDB2'
  password: 'examplePassword', //E.G '6a5s4da6s8d4a6s5d4a5s4da68s4dasd65498asdasdav3a2sd1'
  port: 5432, // whatever port you DB has open, probably 5432

  //Only required on postgres databases and potentially others. Read your database providers documentation on what is needed.
  ssl: {
    rejectUnauthorized: false
  }
})

  //Example function to submit answers to your database
  const submitAnswers = (request, response) => {  
    const { formId, userId, questions } = request.body
    questions.forEach((answerObj) => {
      const title = answerObj.title;
      const answer = answerObj.answer;
      //you will recieve the title of the question, the answer, the id of the answer, the form id, and the id of the user who submitted the answer
      pool.query('INSERT INTO answers (title, answer, formId, userId) VALUES ($1, $2, $3, $4) RETURNING id', [title, answer, formId, userId], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results)
      })
    })
    response.status(201).send(`Answers added successfully`)
  } 

module.exports = {
    submitAnswers,
}