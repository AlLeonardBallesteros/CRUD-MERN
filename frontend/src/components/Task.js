import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';


function Task() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [finishedTasks, setFinishedTasks] = useState([]);



  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/get-tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response.data.error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:4000/create-task', { title: newTask.trim() }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (error) {
        console.error('Error creating task:', error.response.data.error);
      }
    }
  };

  const editTask = async (index, updatedTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:4000/update-task/${tasks[index]._id}`, { title: updatedTask }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedTasks = [...tasks];
      updatedTasks[index].title = updatedTask;
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error.response.data.error);
    }
  };

  const moveTaskToFinished = (index) => {
    const taskToMove = tasks[index];
    setFinishedTasks([...finishedTasks, taskToMove]);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };


  const deleteTask = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/task-delete/${tasks[index]._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error.response.data.error);
    }
  };

  return (
    <div className="tasklist">
    <Header/>
    <h2>Tasks List</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>
    <ul >
      {tasks.map((task, index) => (
        <li key={task._id}>
          <span>{task.title}</span>
          <button className='edit' onClick={() => editTask(index, prompt('Edit task:', task.title))}>Edit</button>
          <button className='delete'onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Task;