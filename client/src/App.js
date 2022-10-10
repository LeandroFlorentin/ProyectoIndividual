import './App.css';
import VideogamesContainer from './Componentes/VideogamesContainer/VideogamesContainer.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/videogames'>
          <VideogamesContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
