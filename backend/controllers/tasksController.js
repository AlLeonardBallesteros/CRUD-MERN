const Task = require('../models/taskModel');

// get all tasks
const gettasks = async (req, res) => {
  try {
    const user_id = req.user._id

    const tasks = await Task.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// create new task
const createtask = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Please provide a title' });
  }
  try {
    const user_id = req.user._id
    const task = await Task.create({ title, user_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a task
const deletetask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a task
const updatetask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Please provide a title' });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, { title }, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  gettasks,
  createtask,
  deletetask,
  updatetask
};
