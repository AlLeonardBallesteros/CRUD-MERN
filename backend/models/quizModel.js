const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
