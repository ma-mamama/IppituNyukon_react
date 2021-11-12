import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';

import TodoList from './components/TodoList'
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: "2em" }}>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/Login" component={Login} />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
