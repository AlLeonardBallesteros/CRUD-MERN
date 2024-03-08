//loading environment variables from a .env file
require('dotenv').config()
// Import required libraries
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const tasks  = require('./controllers/tasksController');
const auth  = require('./controllers/userController');
const requireAuth = require('./middleware/requireAuth');
const app = express()

app.use(cors()) 
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.get('/', (req, res) => {
  res.send('check')
})
// routes
// GET all tasks
app.get('/get-tasks', requireAuth, tasks.gettasks) 
// POST a new task
app.post('/create-task', requireAuth, tasks.createtask) 

// DELETE a task
app.delete('/task-delete/:id', requireAuth, tasks.deletetask) 

// UPDATE a task
app.patch('/update-task/:id', requireAuth, tasks.updatetask)

//auth
//login
app.post('/login', auth.loginUser)

// signup route
app.post('/signup', auth.signupUser)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })