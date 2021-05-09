import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <h1>Home</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
