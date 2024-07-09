// src/ToDoList.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), text: 'CodeHim Code & Scripts', completed: false },
    { id: uuidv4(), text: 'Free Bootstrap 5 Snippets', completed: false },
    { id: uuidv4(), text: 'HTML5 & CSS3', completed: false },
    { id: uuidv4(), text: 'jQuery & JavaScript Plugins', completed: false },
    { id: uuidv4(), text: 'This is done', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const updateTask = () => {
    setTasks(tasks.map(task => task.id === currentTask.id ? { ...task, text: newTask } : task));
    setNewTask('');
    setIsEditing(false);
    setCurrentTask(null);
  };

  return (
    <div className="todo-list">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
            <button onClick={() => editTask(task)}>
              <FaEdit />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
