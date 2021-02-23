const Pool = require('pg').Pool
const pool = new Pool({
  user: 'whwnxgibpnawbv',
  host: 'ec2-100-24-139-146.compute-1.amazonaws.com',
  database: 'd9q6p8qt0mm81j',
  password: '204e680a2816a9d73e5df80c1afe9c1cfb3f9a594a0749f8c5807de3a4eaaf03',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

const logIn = (request, response) => {
    const email = request.query.email;
    const pass = request.query.pass;
    pool.query('SELECT id, type from users where email=$1 AND pass=$2 UNION SELECT managers.id, managers.type from managers WHERE managers.email=$1 AND managers.pass=$2', [email,pass], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(200).json(results.rows)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getQuestionsByUserId = (request, response) =>  {
    console.log("userId: " + request.query.userId);
    const userId = request.query.userId;
    pool.query('SELECT DISTINCT title, name from questions Inner join forms on questions.form_id = forms.id inner join assignedForm on forms.id = assignedForm.form_id Where user_id = $1',[userId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    console.log(request.body)
    const {name, email, pass, managerId } = request.body
    
    pool.query('INSERT INTO users (name, email, pass, manager_id) VALUES ($1, $2, $3, $4) RETURNING id', [name, email, pass, managerId], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const createManager = (request, response) => {
    console.log(request.body)
    const { name, email, pass } = request.body
    
    pool.query('INSERT INTO managers (name, email, pass) VALUES ($1, $2, $3) RETURNING id', [name, email, pass], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`Manager added with ID: ${results.rows[0].id}`)
    })
}

const createForm = (request, response) => {
    console.log(request.body)
    const {name, managerId, questions, assignees } = request.body
    let formId;
    //first create a form and get it's ID

    let makeForm = (createNewForm(thenAddQuestions, request));
    console.log("makeForm: " + makeForm)
    response.status(201).send('Form created');
}

function createNewForm(callback, request) {
    const {name, managerId, questions, assignees } = request.body
    pool.query('INSERT INTO forms (name, manager_id) VALUES ($1, $2) RETURNING id', [name, managerId], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results)
        formId = results.rows[0].id;
        console.log("formId: " + formId)
        return callback(questions, assignees, formId)
      })
}

function thenAddQuestions(questions, assignees, id) {
    console.log(questions)
    console.log(id)
    console.log("assignees: " + assignees)
    questions.forEach((question) => {
        pool.query('INSERT INTO questions (form_id, title) VALUES ($1, $2)', [id, question.title], (error, results) => {
            if (error) {
              throw error
            }
          })
    })

    assignees.forEach((assignee) => {
        pool.query('INSERT INTO assignedForm (form_id, user_id) VALUES ($1, $2)', [id, assignee.id], (error, results) => {
            if (error) {
              throw error
            }
          })
    })
    return id;
}



module.exports = {
    getUsers,
    createUser,
    createManager,
    createForm,
    getQuestionsByUserId,
    logIn,
  }