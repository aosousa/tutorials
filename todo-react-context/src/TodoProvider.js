import React, { useState } from 'react';
import TodoContext from './TodoContext';
 
const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = (tasks) => {
    setTasks(tasks)
  }
 
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
 
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
 
  return (
    <TodoContext.Provider value={{ tasks, loadTasks, addTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};
 
export default TodoProvider;