import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoProvider from './TodoProvider';

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <TodoList />
        <TodoForm />
      </TodoProvider>
    </div>
  );
}

export default App;
