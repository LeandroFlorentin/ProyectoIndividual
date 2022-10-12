import './App.css';
import VideogamesContainer from './Componentes/VideogamesContainer/VideogamesContainer.js'
import VideoGameContainer from './Componentes/VideoGameContainer/VideoGameContainer.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/videogames'>
          <VideogamesContainer />
        </Route>
        <Route exact path='/videogames/:id'>
          <VideoGameContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
