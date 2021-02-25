const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const saltRounds = 10;

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

    const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    pool.query('SELECT id, pass, type from users where email=$1 UNION SELECT managers.id, managers.pass, managers.type from managers WHERE managers.email=$1', [login], (error, results) => {
      if (error) {
        throw error
      }
      
      bcrypt.compare(password, results.rows[0].pass ? results.rows[0].pass : null , function(err, result) {
        if(result == true){
          console.log("sucessful login")
          //console.log(results)
          let toReturn = {
            id: results.rows[0].id,
            type:  results.rows[0].type
          }
          response.status(200).json(toReturn)
        } else {
          let failReason = {
            status: "404",
            reason: "User does not exist or credentials are incorrect"
          }
          response.status(404).json(failReason)
        }
      });
      console.log("failedLogin")
      //console.log(results)
      
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
    pool.query('SELECT DISTINCT title, name from questions Inner join forms on questions.form_id = forms.id inner join assignedforms on forms.id = assignedforms.form_id Where user_id = $1',[userId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    console.log(request.body)
    const {name, email, pass, managerId, phone } = request.body

    bcrypt.hash(pass, saltRounds, function(err, hash) {
      pool.query('INSERT INTO users (name, email, pass, manager_id, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, email, hash, managerId, phone], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results)
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
      })
    });
    
    
}

const createManager = (request, response) => {
    console.log(request.body)
    const { name, email, pass, phone } = request.body
    
    bcrypt.hash(pass, saltRounds, function(err, hash) {
      pool.query('INSERT INTO managers (name, email, pass, phone) VALUES ($1, $2, $3, $4) RETURNING id', [name, email, hash, phone], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results)
        response.status(201).send(`Manager added with ID: ${results.rows[0].id}`)
      })
  });

    
}

const createForm = (request, response) => {
    console.log(request.body)

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
      pool.query('INSERT INTO assignedforms (form_id, user_id) VALUES ($1, $2)', [id, assignee.id], (error, results) => {
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