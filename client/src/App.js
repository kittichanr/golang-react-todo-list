import './App.css';
import TodoList from './TodoList';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <div>
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
