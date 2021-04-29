import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Land/Landing";
import "./App.scss";
import Home2 from "./components/Home/Home2";
import bgpokeball from "./assets/backgroundpokeball.svg";
import SinglePokemon from "./components/Pokemon/SinglePokemon";
// import Pokedex from "./components/Pokedex/Pokedex";
// import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <img className="bgpokeball" src={bgpokeball} alt="bgpokeball" />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/pokedex" render={(props) => <Home2 {...props} />} />
        <div className="bg_app">
          <Route exact path="/:pokemonId" component={SinglePokemon} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
