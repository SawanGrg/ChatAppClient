import { Provider } from 'react-redux';
import './App.css';
import Router from './router/router';
import { store } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;

