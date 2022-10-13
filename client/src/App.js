import './App.css';
import VideogamesContainer from './Componentes/VideogamesContainer/VideogamesContainer.js'
import VideoGameContainer from './Componentes/VideoGameContainer/VideoGameContainer.js'
import CreateGame from './Componentes/CreateGameContainer/CreateGame.js'
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
        <Route exact path='/createvideogame'>
          <CreateGame />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
