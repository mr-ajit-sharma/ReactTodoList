import{ ReactNotifications} from 'react-notifications-component'
import { TodoContainer } from './components/container/TodoContainer'
import './App.css';

function App() {
  return (
    <div >
      <ReactNotifications />
      <TodoContainer />
    </div>
  );
}

export default App;
