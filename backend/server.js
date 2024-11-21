// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const quizController = require('./controllers/quizController');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('check');
});
 

app.post('/saveQuiz', quizController.saveQuizSettings);



// Connect to the database
const MONGO_URI = 'mongodb+srv://alleonardballesteros595:xQFmz8v2CM68gNDG@cluster0.mkkxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
const PORT = 4000; // Replace with your desired port number

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to db & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
