import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Land/Landing";
import Home from "./components/Home/Home";
import Pokemon from "./components/Pokemon/Pokemon";
import Pokedex from "./components/Pokedex/Pokedex";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/pokedex" render={(props) => <Home {...props} />} />
        <Route exact path="/:pokemonId" component={Pokemon} />
      </Switch>
    </Router>
  );
}

export default App;
