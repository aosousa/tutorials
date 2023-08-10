import React, { useContext } from 'react';
import TodoContext from './TodoContext';
 
const TodoList = () => {
  const { tasks, deleteTask } = useContext(TodoContext);
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.taskName}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
 
export default TodoList;