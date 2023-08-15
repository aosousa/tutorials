import React, { useContext, useEffect } from 'react';
import TodoContext from './TodoContext';
 
const TodoList = () => {
  const { tasks, loadTasks, deleteTask } = useContext(TodoContext);

  useEffect(() => {
    loadTasks([
      {
        id: 1,
        taskName: 'foo'
      },
      {
        id: 2,
        taskName: 'bar',
      },
      {
        id: 3,
        taskName: 'etc'
      }
    ])
  }, [])

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