const Quiz = require('../models/quizModel');

// Create and Save a new Quiz
exports.saveQuizSettings = async (req, res) => {
  const { name, category, difficulty } = req.body;

  // Input validation
  if (!name || !category || !difficulty) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newQuiz = new Quiz({ name, category, difficulty });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz settings saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save quiz settings.' });
  }
};
